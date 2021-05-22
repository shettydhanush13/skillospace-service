const { updateDB } = require("../../db/postgres")
const { generateQuery, compare, generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("./helper")
const { validateSignupPayload, validateLoginPayload, validateTokenPayload } = require("./validation")

module.exports = {
    signup: async (req, res) => {
        try {
            const validation = validateSignupPayload(req.body)
            if(validation.error) return res.status(500).json({ message: validation.message });
            const { username, email, password } = req.body
            await updateDB(generateQuery.createUserTable())
            await updateDB(await generateQuery.insertUser(username, email, password))
            res.json({ message: "signup successful" });
        } catch(err) {
            res.status(400).json({ message: err.stack });
        }
    },
    login: async (req, res) => {
        try {
            const validation = validateLoginPayload(req.body)
            if(validation.error) return res.status(500).json({ message: validation.message });
            const { email, password } = req.body
            await updateDB(generateQuery.createTokenTable())
            const response = await updateDB(generateQuery.getUser(email))
            const user = response.rows[0]
            if(response.rows.length === 0){
                res.status(404).json({ message: "no account found with this email" });
            } else {
                const validPassword = await compare(password, user.password)
                if(!validPassword) {
                    res.status(401).json({ message: "incorrect password" });
                } else {
                    const accessToken = generateAccessToken(user);
                    const refreshToken = generateRefreshToken(user);
                    await updateDB(generateQuery.addToken(refreshToken))
                    res.status(200).json({ accessToken, refreshToken });
                }
            }
        } catch(err) {
            res.status(400).json({ message: err.stack });
        }
    },
    logout: async (req, res) => {
        try {
            const validation = validateTokenPayload(req.body)
            if(validation.error) return res.status(500).json({ message: validation.message });
            await updateDB(generateQuery.deleteToken(req.body.token))
            res.json({ message: "logout successful" });
        } catch(err) {
            res.status(400).json({ message: err.stack });
        }
    },
    token : async (req, res) => {
        try {
            const validation = validateTokenPayload(req.body)
            if(validation.error) return res.status(500).json({ message: validation.message });
            const refreshToken = req.body.token;
            if(!refreshToken) return res.status(401).json({ message: "invalid token" });
            const response = await updateDB(generateQuery.getToken(refreshToken))
            if(response.rows.length === 0) res.status(403).json({ message: "not authenticated" });
            else{
                verifyRefreshToken(refreshToken)
                .then(response => res.status(200).json(response))
                .catch(err => res.status(403).send({ message: err.message }))
            }
        } catch(err) {
            res.status(400).json({ message: err.stack });
        }
    }
}