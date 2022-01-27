const generateQuery = {
    createSkillTable : () => `CREATE TABLE IF NOT EXISTS skill (
        id serial primary key,
        title varchar(50) NOT NULL,
        creator varchar(50) NOT NULL,
        skill_id varchar(50) NOT NULL unique
      )`,
    addSkill : (title, creator, skill_id) => `INSERT INTO skill (title, creator, skill_id) VALUES ('${title}', '${creator}', '${skill_id}')`,
    getAllSkill : () => `SELECT * FROM skill`,
    getSkillById : skill_id => `
      SELECT * FROM skill
      WHERE skill.skill_id = '${skill_id}'`,
    updateSkill : (title, creator, skill_id) => `UPDATE skill SET title = ${title}, creator=${creator}, skill_id=${skill_id}, WHERE (skill_id = '${skill_id}') returning id`,
    deleteSkill : (skill_id) => `DELETE FROM skill WHERE (skill_id = '${skill_id}') returning id`,
    deleteTable: () => `DROP TABLE IF EXISTS skill`
}

module.exports = { generateQuery }