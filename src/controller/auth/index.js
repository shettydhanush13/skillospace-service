const { updateDB } = require("../../db/postgres")
const { generateQuery, compare, generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("./helper")
const { validateSignupPayload, validateLoginPayload, validateTokenPayload } = require("./validation")

module.exports = {
    signup: async (req, res, next) => {
        try {
            const validation = validateSignupPayload(req.body)
            if(validation.error) return next({status : 500, message : validation.message })
            const { username, email, password } = req.body
            await updateDB(generateQuery.createUserTable())
            await updateDB(await generateQuery.insertUser(username, email, password))
            res.json({ message: "signup successful" });
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    login: async (req, res, next) => {
        try {
            const validation = validateLoginPayload(req.body)
            if(validation.error) return next({status : 500, message : validation.message })
            const { email, password } = req.body
            await updateDB(generateQuery.createTokenTable())
            const response = await updateDB(generateQuery.getUser(email))
            const user = response.rows[0]
            if(response.rows.length === 0) return next({status : 404, message : "no account found with this email" })
            const validPassword = await compare(password, user.password)
            if(!validPassword) return next({status : 401, message : "incorrect password" })
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            await updateDB(generateQuery.addToken(refreshToken))
            res.status(200).json({ accessToken, refreshToken, ...{ username: user.user_name } });
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    logout: async (req, res, next) => {
        try {
            const validation = validateTokenPayload(req.body)
            if(validation.error) return next({status : 500, message : validation.message })
            await updateDB(generateQuery.deleteToken(req.body.token))
            res.json({ message: "logout successful" });
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    token : async (req, res, next) => {
        try {
            const validation = validateTokenPayload(req.body)
            if(validation.error) return next({status : 500, message : validation.message })
            const refreshToken = req.body.token;
            if(!refreshToken) return next({status : 401, message : "invalid token" })
            const response = await updateDB(generateQuery.getToken(refreshToken))
            if(response.rows.length === 0) return next({status : 403, message : "not authenticated" })
            else{
                verifyRefreshToken(refreshToken)
                .then(response => res.status(200).json(response))
                .catch(err => next({status : 403, message : err.message }))
            }
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    clearDB : async (req, res, next) => {
        const skillQuery = require('../skill/helper').generateQuery
        const progressQuery = require('../progress/helper').generateQuery
        const lessonsQuery = require('../lessons/helper').generateQuery
        const progressLessonsQuery = require('../progress_lesson/helper').generateQuery
        try {
            await updateDB(progressLessonsQuery.deleteTable())
            await updateDB(lessonsQuery.deleteTable())
            await updateDB(progressQuery.deleteTable())
            await updateDB(skillQuery.deleteTable())
            await updateDB(generateQuery.deleteTable())
            res.status(200).send({ message : "tables deleted succesfulluy" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    }
}