const { Pool } = require('pg');
const { logger } = require('../../core/logger');
const { poolData } = require("../../config") 

const pool = new Pool(poolData)

module.exports = {
  test: () => {
    pool.connect().then((client) => {
      return client.query('SELECT NOW() as now', (err, result) => {
        if (err) {
          logger.error(err);
          client.release();
          return false;
        }
        logger.info(
          `Postgres Connection Pool Available: ${JSON.stringify(result.rows)}`
        );
        client.release();
      });
    });
  },
  updateDB : query => {
    return new Promise((resolve, reject) => {
      pool.query(query ,(error, results) => {
      if (error) reject(error);
        else resolve(results);
      })
    });
  }
};
