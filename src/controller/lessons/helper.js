const generateQuery = {
    createLessonsTable : () => `CREATE TABLE IF NOT EXISTS lesson (
        id serial primary key,
        title varchar(500) NOT NULL,
        thumb varchar(500),
        url varchar(500) NOT NULL,
        skill_id varchar(50) REFERENCES skill (skill_id) ON DELETE CASCADE
      )`,
    addLesson : (skill_id, url, title, thumb) => `INSERT INTO lesson (skill_id, url, title, thumb) VALUES ('${skill_id}', '${url}', '${title}', '${thumb}')`,
    getLessonsBySkill : skill_id => `SELECT * FROM lesson WHERE skill_id = '${skill_id}'`,
    updateLesson : (lessonId, skill_id, url, title, thumb) => `UPDATE lesson SET url = ${url}, title=${title}, thumb=${thumb}, skill_id=${skill_id} WHERE (id = '${lessonId}') returning id`,
    deleteLesson : (id) => `DELETE FROM lesson WHERE (id = '${id}') returning id`,
    deleteTable: () => `DROP TABLE IF EXISTS lesson`
}

module.exports = { generateQuery }