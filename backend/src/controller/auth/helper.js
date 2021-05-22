const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../../config")
const { accessTokenSecret, refreshTokenSecret } = config

const encode = async (password) => await bcrypt.hash(password, 10)

const compare = async (password, hash) => await bcrypt.compare(password, hash)

const generateAccessToken = user => jwt.sign(user, accessTokenSecret, { expiresIn : "3000s" })

const generateRefreshToken = user => jwt.sign(user, refreshTokenSecret)

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, config.refreshTokenSecret, (err, user) => {
            if(err) reject({ message: "not authenticated" })
            else{
                const accessToken = generateAccessToken(user);
                resolve({accessToken})
            }
        })
    })
}

const verifyAccessToken = accessToken => {
    return new Promise((resolve) => {
        jwt.verify(accessToken, config.accessTokenSecret, (err, user) => {
            if(err) resolve({ error : true, message: err })
            else resolve({error : false, user})
        })
    })
}

const generateQuery = {
    createUserTable : () => `CREATE TABLE IF NOT EXISTS users (
        id serial primary key,
        user_name varchar(50) NOT NULL unique,
        password varchar(500) NOT NULL,
        email varchar(50) NOT NULL unique
      )`,
    insertUser : async (username, email, password) => `INSERT INTO users (user_name, password, email) VALUES 
        ('${username}', '${await encode(password)}', '${email}')`,
    getUser : email => `SELECT * FROM users WHERE email = '${email}'`,
    createTokenTable : () => `CREATE TABLE IF NOT EXISTS refreshtoken (
        id serial primary key,
        token varchar(5000) NOT NULL
      )`,
    addToken : token => `INSERT INTO refreshtoken (token) VALUES ('${token}')`,
    deleteToken : token => `DELETE FROM refreshtoken WHERE token = '${token}'`,
    getToken : token => `SELECT * FROM refreshtoken  WHERE token = '${token}'`
}

module.exports = { generateQuery, compare, generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken }