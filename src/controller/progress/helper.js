const generateQuery = {
    createProgressTable : () => `CREATE TABLE IF NOT EXISTS progress (
        id serial primary key,
        progress varchar(50) NOT NULL,
        user_name varchar(50) REFERENCES users (user_name),
        lessons varchar(50) NOT NULL,
        skill_id varchar(50) REFERENCES skill (skill_id))`,
    addProgress : (username, progress, skill_id, lessons) => `
        INSERT INTO progress (user_name, progress, skill_id, lessons)
        VALUES ('${username}', '${progress}', '${skill_id}', '${lessons}')`,
    getMyProgress : username => `
        SELECT * FROM progress
        INNER JOIN skill
        ON progress.skill_id = skill.skill_id
        WHERE user_name = '${username}'`,
    getProgressBySkillId : skill_id => `
        SELECT * FROM progress
        WHERE skill_id = '${skill_id}'`,
    getProgressBySkillIdForUser : (skill_id, username) => `
        SELECT id, lessons, progress FROM progress
        WHERE skill_id = '${skill_id}' AND user_name = '${username}'`,
    updateProgress : (id, username, progress, lessons) => `
        UPDATE progress
        SET progress = '${progress}', lessons='${lessons}'
        WHERE (id = '${id}') AND (user_name = '${username}')
        returning id`,
    deleteProgress : (id, username) => `
        DELETE FROM progress
        WHERE (id = '${id}') AND (user_name = '${username}')
        returning id`,
    deleteTable: () => `DROP TABLE IF EXISTS progress`
}

module.exports = { generateQuery }