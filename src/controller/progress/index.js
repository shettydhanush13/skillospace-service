const { generateQuery } = require("./helper")
const { updateDB } = require("../../db/postgres")

module.exports = {
    addProgress : async (req, res, next) => {
        try {
            const { username, progress, skill_id } = req.body
            await updateDB(generateQuery.createProgressTable())
            await updateDB(generateQuery.addProgress(username, progress, skill_id))
            res.status(200).send({ message : "progress updated" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    getMyProgress : async (req, res, next) => {
        try {
            const { username } = req.body
            const response = await updateDB(generateQuery.getMyProgress(username))
            res.status(200).send({ items : response.rows })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    getProgressBySkillId : async (req, res, next) => {
        try {
            const { skill_id } = req.params
            const response = await updateDB(generateQuery.getProgressBySkillId(skill_id))
            res.status(200).send({ items : response.rows })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    updateProgress : async (req, res, next) => {
        try {
            const { username, progress } = req.body
            const { progressId } = req.params
            const response = await updateDB(generateQuery.updateProgress(progressId, username, progress))
            if(response.rows.length === 0) return next({status : 401, message : "unable to update this progress" })
            res.status(200).send({ items : "update successful" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    deleteProgress : async (req, res, next) => {
        try {
            const { username } = req.body
            const { progressId } = req.params
            const response = await updateDB(generateQuery.deleteProgress(progressId, username))
            if(response.rows.length === 0) return next({status : 401, message : "unable to delete this progress" })
            res.status(200).send({ items : "delete successful" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    }
}