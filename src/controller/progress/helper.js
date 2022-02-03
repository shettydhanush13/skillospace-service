const generateQuery = {
    createProgressTable : () => `CREATE TABLE IF NOT EXISTS progress (
        progress_id serial PRIMARY KEY,
        user_name varchar(50) REFERENCES users (user_name),
        skill_id varchar(50) REFERENCES skill (skill_id))`,
    addProgress : (username, skill_id) => `
        INSERT INTO progress (user_name, skill_id)
        VALUES ('${username}', '${skill_id}')`,
    getMyProgress : username => `
        SELECT 
            s.skill_id,
            s.skill_name,
            s.thumb,
            p.progress_id,
            ARRAY_AGG(DISTINCT pl.lesson_id) as completed_lessons,
            ARRAY_AGG(DISTINCT l.lesson_id) as all_lessons
        FROM progress p
        INNER JOIN skill s
            ON p.skill_id = s.skill_id
        INNER JOIN progress_lesson pl
            ON p.progress_id = pl.progress_id
        INNER JOIN lesson l
            ON p.skill_id = l.skill_id
        WHERE user_name = '${username}'
        GROUP BY p.progress_id, s.skill_id, s.skill_name, s.thumb`,
    getProgressBySkillId : skill_id => `
        SELECT * FROM progress
        WHERE skill_id = '${skill_id}'`,
    getProgressBySkillIdForUser : (skill_id, username) => `
        SELECT id, lessons, progress FROM progress
        WHERE skill_id = '${skill_id}' AND user_name = '${username}'`,
    deleteProgress : (id, username) => `
        DELETE FROM progress
        WHERE (id = '${id}') AND (user_name = '${username}')`,
    deleteTable: () => `DROP TABLE IF EXISTS progress`
}

module.exports = { generateQuery }