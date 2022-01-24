const { generateQuery } = require("./helper")
const { updateDB } = require("../../db/postgres")

module.exports = {
    addSkill : async (req, res, next) => {
        try {
            const { title, creator, skillId } = req.body
            await updateDB(generateQuery.createSkillTable())
            await updateDB(generateQuery.addSkill(title, creator, skillId))
            res.status(200).send({ message : "skill updated" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    getAllSkill : async (req, res, next) => {
        try {
            const response = await updateDB(generateQuery.getAllSkill())
            res.status(200).send({ items : response.rows })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    getSkillById : async (req, res, next) => {
        try {
            const { skillId } = req.params
            const response = await updateDB(generateQuery.getSkillById(skillId))
            res.status(200).send({ items : response.rows })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    updateSkill : async (req, res, next) => {
        try {
            const { skillId } = req.params
            const { title, creator } = req.body
            const response = await updateDB(generateQuery.updateSkill(title, creator, skillId))
            if(response.rows.length === 0) return next({status : 401, message : "unable to update this skill" })
            res.status(200).send({ items : "update successful" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    deleteSkill : async (req, res, next) => {
        try {
            const { skillId } = req.params
            const response = await updateDB(generateQuery.deleteSkill(skillId))
            if(response.rows.length === 0) return next({status : 401, message : "unable to delete this skill" })
            res.status(200).send({ items : "delete successful" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    }
}