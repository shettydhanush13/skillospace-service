const generateQuery = {
    createProgressTable : () => `CREATE TABLE IF NOT EXISTS progress (
        id serial primary key,
        progress varchar(50) NOT NULL,
        user_name varchar(50) REFERENCES users (user_name) ON DELETE CASCADE,
        skillId varchar(50) REFERENCES skill (skillid) ON DELETE CASCADE,
      )`,
    addProgress : (username, progress, title) => `INSERT INTO progress (user_name, progress, title) VALUES ('${username}', '${progress}', '${title}')`,
    getMyProgress : username => `SELECT * FROM progress WHERE user_name = '${username}'`,
    updateProgress : (id, username, progress) => `UPDATE progress SET progress = ${progress} WHERE (id = '${id}') AND (user_name = '${username}') returning id`,
    deleteProgress : (id, username) => `DELETE FROM progress WHERE (id = '${id}') AND (user_name = '${username}') returning id`,
    deleteTable: () => `DROP TABLE IF EXISTS progress`
}

module.exports = { generateQuery }