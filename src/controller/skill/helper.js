const generateQuery = {
    createSkillTable : () => `CREATE TABLE IF NOT EXISTS skill (
        skill_id varchar(50) PRIMARY KEY,
        skill_name varchar(50) NOT NULL,
        thumb varchar(500)
      )`,
    addSkill : (skill_name, thumb, skill_id) => `INSERT INTO skill (skill_name, thumb, skill_id) VALUES ('${skill_name}', '${thumb}', '${skill_id}')`,
    getAllSkill : () => `
      SELECT
        s.skill_name,
        s.thumb,
        s.skill_id,
        ARRAY_AGG(DISTINCT p.progress_id) as progress
      FROM skill s
      FULL OUTER JOIN progress p
        ON p.skill_id = s.skill_id
      GROUP BY s.skill_name, s.thumb, s.skill_id`,
    getSkillById : (skill_id, username) => `
      SELECT
        s.skill_name,
        s.skill_id,
        p.progress_id,
        json_build_object(
          'all_lessons', ARRAY_AGG(DISTINCT l.*)
        )
      FROM skill s
      INNER JOIN lesson l
        ON s.skill_id = l.skill_id
      INNER JOIN progress p
        ON s.skill_id = p.skill_id
      WHERE (s.skill_id = '${skill_id}' AND p.user_name = '${username}')
      GROUP BY s.skill_name, s.skill_id, p.progress_id`,
    updateSkill : (skill_name, thumb, skill_id) => `UPDATE skill SET skill_name = ${skill_name}, thumb=${thumb}, skill_id=${skill_id}, WHERE (skill_id = '${skill_id}')`,
    deleteSkill : (skill_id) => `DELETE FROM skill WHERE (skill_id = '${skill_id}')`,
    deleteTable: () => `DROP TABLE IF EXISTS skill`
}

module.exports = { generateQuery }