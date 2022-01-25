const generateQuery = {
    createSkillTable : () => `CREATE TABLE IF NOT EXISTS skill (
        id serial primary key,
        title varchar(50) NOT NULL,
        creator varchar(50) NOT NULL,
        skillId varchar(50) NOT NULL unique
      )`,
    addSkill : (title, creator, skillId) => `INSERT INTO skill (title, creator, skillId) VALUES ('${title}', '${creator}', '${skillId}')`,
    getAllSkill : () => `SELECT * FROM skill`,
    getSkillById : skillId => `SELECT * FROM skill WHERE skillId = '${skillId}'`,
    updateSkill : (title, creator, skillId) => `UPDATE skill SET title = ${title}, creator=${creator}, skillId=${skillId}, WHERE (skillId = '${skillId}') returning id`,
    deleteSkill : (skillId) => `DELETE FROM skill WHERE (skillId = '${skillId}') returning id`,
    deleteTable: () => `DROP TABLE IF EXISTS skill`
}

module.exports = { generateQuery }