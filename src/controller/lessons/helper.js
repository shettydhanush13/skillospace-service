const generateQuery = {
    createLessonsTable : () => `CREATE TABLE IF NOT EXISTS lesson (
        lesson_id serial PRIMARY KEY,
        lesson_title varchar(500) NOT NULL,
        lesson_thumb varchar(500),
        lesson_url varchar(500) NOT NULL,
        creator varchar(50),
        skill_id varchar(50) REFERENCES skill (skill_id) ON DELETE CASCADE
      )`,
    addLesson : (creator, skill_id, lesson_url, lesson_title, lesson_thumb) => `
      INSERT INTO lesson (creator, skill_id, lesson_url, lesson_title, lesson_thumb)
      VALUES ('${creator}', '${skill_id}', '${lesson_url}', '${lesson_title}', '${lesson_thumb}')`,
    getLessonsBySkill : skill_id => `SELECT * FROM lesson WHERE skill_id = '${skill_id}'`,
    updateLesson : (lesson_id, creator, skill_id, lesson_url, lesson_title, lesson_thumb) => `
      UPDATE lesson SET
      lesson_url = '${lesson_url}',
      creator = '${creator}',
      lesson_title = '${lesson_title}',
      lesson_thumb = '${lesson_thumb}',
      skill_id = '${skill_id}'
      WHERE (lesson_id = ${Number(lesson_id)})
    `,
    deleteLesson : (lesson_id) => `DELETE FROM lesson WHERE (lesson_id = '${lesson_id}')`,
    deleteTable: () => `DROP TABLE IF EXISTS lesson`
}

module.exports = { generateQuery }