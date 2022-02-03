const { Pool } = require('pg');
const { logger } = require('../../core/logger');
const { poolData } = require("../../config") 
const userQuery = require('../../controller/auth/helper').generateQuery
const progressLessonQuery = require('../../controller/progress_lesson/helper').generateQuery
const skillQuery = require('../../controller/skill/helper').generateQuery
const progressQuery = require('../../controller/progress/helper').generateQuery
const lessonsQuery = require('../../controller/lessons/helper').generateQuery

const pool = new Pool(poolData)

const updateDB = query => {
  return new Promise((resolve, reject) => {
    pool.query(query ,(error, results) => {
    if (error) reject(error);
      else resolve(results);
    })
  });
}

module.exports = {
  test: () => {
    pool.connect().then((client) => {
      return client.query('SELECT NOW() as now', async (err, result) => {
        if (err) {
          logger.error(err);
          client.release();
          return false;
        }
        try {
          await updateDB(userQuery.createUserTable())
          await updateDB(userQuery.createTokenTable())
          await updateDB(skillQuery.createSkillTable())
          await updateDB(lessonsQuery.createLessonsTable())
          await updateDB(progressQuery.createProgressTable())
          await updateDB(progressLessonQuery.createProgressLessonTable())
        } catch (err) {
          logger.error(err);
        }
        logger.info(
          `Postgres Connection Pool Available: ${JSON.stringify(result.rows)}`
        );
        client.release();
      });
    });
  },
  updateDB: updateDB
};
