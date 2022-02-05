const { generateQuery } = require("./helper")
const { updateDB } = require("../../db/postgres")

module.exports = {
    addSkill : async (req, res, next) => {
        try {
            const { skill_name, thumb, skill_id } = req.body
            await updateDB(generateQuery.createSkillTable())
            await updateDB(generateQuery.addSkill(skill_name, thumb, skill_id))
            res.status(200).send({ message : "skill updated" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    getAllSkill : async (req, res, next) => {
        try {
            await updateDB(generateQuery.createSkillTable())
            const response = await updateDB(generateQuery.getAllSkill())
            res.status(200).send({ items : response.rows })
        } catch(err) {
            console.log(err)
            next({status : 500, message : err.stack })
        }
    },
    getSkillById : async (req, res, next) => {
        try {
            const { skill_id } = req.params
            const { username } = req.body
            const progress_lessonQuery = require('../progress_lesson/helper').generateQuery
            const response = await updateDB(generateQuery.getSkillById(skill_id, username))
            const response2 = await updateDB(progress_lessonQuery.getProgressLesson(response.rows[0].progress_id))
            response.rows[0].json_build_object.completed_lessons = response2.rows[0]?.lessons || []
            res.status(200).send({ items : response.rows[0] || null })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    updateSkill : async (req, res, next) => {
        try {
            const { skill_id } = req.params
            const { skill_name, thumb } = req.body
            const response = await updateDB(generateQuery.updateSkill(skill_name, thumb, skill_id))
            if(response.rows.length === 0) return next({status : 401, message : "unable to update this skill" })
            res.status(200).send({ items : "update successful" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    deleteSkill : async (req, res, next) => {
        try {
            const { skill_id } = req.params
            const response = await updateDB(generateQuery.deleteSkill(skill_id))
            if(response.rows.length === 0) return next({status : 401, message : "unable to delete this skill" })
            res.status(200).send({ items : "delete successful" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    }
}