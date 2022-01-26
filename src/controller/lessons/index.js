const { generateQuery } = require("./helper")
const { updateDB } = require("../../db/postgres")

module.exports = {
    addLesson : async (req, res, next) => {
        try {
            const { skill_id, url, title, thumb } = req.body
            await updateDB(generateQuery.createLessonsTable())
            await updateDB(generateQuery.addLesson(skill_id, url, title, thumb))
            res.status(200).send({ message : "lesson updated" })
        } catch(err) {
            console.log(err)
            next({status : 500, message : err.stack })
        }
    },
    getLessonsBySkill : async (req, res, next) => {
        try {
            const { skill_id } = req.params
            const response = await updateDB(generateQuery.getLessonsBySkill(skill_id))
            res.status(200).send({ items : response.rows })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    updateLesson : async (req, res, next) => {
        try {
            const { skill_id, url, title, thumb } = req.body
            const { lessonId } = req.params
            const response = await updateDB(generateQuery.updateLesson(lessonId, skill_id, url, title, thumb))
            if(response.rows.length === 0) return next({status : 401, message : "unable to update this lesson" })
            res.status(200).send({ items : "update successful" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    deleteLesson : async (req, res, next) => {
        try {
            const { lessonId } = req.params
            const response = await updateDB(generateQuery.deleteLesson(lessonId))
            if(response.rows.length === 0) return next({status : 401, message : "unable to delete this lesson" })
            res.status(200).send({ items : "delete successful" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    }
}