const generateQuery = {
    createLessonsTable : () => `CREATE TABLE IF NOT EXISTS lesson (
        id serial primary key,
        title varchar(50) NOT NULL,
        thumb varchar(50) NOT NULL,
        url varchar(50) NOT NULL,
        skillId varchar(50) REFERENCES skill (skillId) ON DELETE CASCADE,
      )`,
    addProgress : (skillId, url, title, thumb) => `INSERT INTO progress (skillId, url, title, thumb) VALUES ('${skillId}', '${url}', '${title}', '${thumb}')`,
    getLessonsBySkill : skillId => `SELECT * FROM progress WHERE skillId = '${skillId}'`,
    updateLesson : (skillId, url, title, thumb) => `UPDATE progress SET url = ${url}, title=${title}, thumb=${thumb} WHERE (skillId = '${skillId}') returning id`,
    deleteLesson : (id) => `DELETE FROM progress WHERE (id = '${id}') returning id`
}

module.exports = { generateQuery }