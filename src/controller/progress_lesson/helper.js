const generateQuery = {
    createProgressLessonTable : () => `CREATE TABLE IF NOT EXISTS progress_lesson (
        progress_id serial REFERENCES progress (progress_id),
        lesson_id serial REFERENCES lesson (lesson_id),
        completion integer
    )`,
    addProgressLesson : (progress_id, lesson_id) => `
        INSERT INTO progress_lesson (progress_id, lesson_id, completion)
        VALUES (${progress_id}, ${lesson_id}, ${0})`,
    getProgressLesson : (progress_id) => `
        SELECT progress_id, ARRAY_AGG(DISTINCT lesson_id) as lessons
        FROM progress_lesson
        WHERE (progress_id = ${progress_id})
        GROUP BY progress_id`,
    deleteTable: () => `DROP TABLE IF EXISTS progress_lesson`
}

module.exports = { generateQuery }