const { generateQuery } = require("./helper")
const { updateDB } = require("../../db/postgres")

module.exports = {
    addProgressLesson : async (req, res, next) => {
        try {
            const { progress_id, lesson_id } = req.body
            await updateDB(generateQuery.createProgressLessonTable())
            await updateDB(generateQuery.addProgressLesson(progress_id, lesson_id))
            res.status(200).send({ message : "lessons progress updated" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    getProgressLesson : async (req, res, next) => {
        try {
            const { progress_id } = req.params
            const response = await updateDB(generateQuery.getProgressLesson(progress_id))
            res.status(200).send({ item : response.rows[0] ||  response.rows })
        } catch(err) {
            res.status(500).send({ err })
        }
    }
}