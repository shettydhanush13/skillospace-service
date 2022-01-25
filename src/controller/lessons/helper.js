const generateQuery = {
    createLessonsTable : () => `CREATE TABLE IF NOT EXISTS lesson (
        id serial primary key,
        title varchar(500) NOT NULL,
        thumb varchar(500),
        url varchar(500) NOT NULL,
        skillId varchar(50) REFERENCES skill (skillid) ON DELETE CASCADE,
      )`,
    addLesson : (skillId, url, title, thumb) => {
      console.log({ skillId, url, title, thumb })
      console.log(`INSERT INTO lesson (skillId, url, title, thumb) VALUES ('${skillId}', '${url}', '${title}', '${thumb}')`)
      return `INSERT INTO lesson (skillId, url, title, thumb) VALUES ('${skillId}', '${url}', '${title}', '${thumb}')`
    },
    getLessonsBySkill : skillId => `SELECT * FROM lesson WHERE skillId = '${skillId}'`,
    updateLesson : (lessonId, skillId, url, title, thumb) => `UPDATE lesson SET url = ${url}, title=${title}, thumb=${thumb}, skillId=${skillId} WHERE (id = '${lessonId}') returning id`,
    deleteLesson : (id) => `DELETE FROM lesson WHERE (id = '${id}') returning id`,
    deleteTable: () => `DROP TABLE IF EXISTS lesson`
}

module.exports = { generateQuery }