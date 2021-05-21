const cors = require('cors');
const { urlencoded, json } = require('express');
const { errorHandler } = require('./errorHandler');
const { logger } = require('./logger');

module.exports = {
  middleware: (app) => {
    app.use(json({ limit: '15000000' }));

    app.use(urlencoded({
      limit: '15000000',
      extended: true
    }));

    app.use(
      cors({
        optionsSuccessStatus: 200,
      })
    );

    app.use((error, req, res, next) => {
      //Return if any syntax error
      if (error instanceof SyntaxError) {
        console.log(error, 'error');
        return errorHandler(
          { message: 'Bad Request.', statusCode: 400 },
          req,
          res
        );
      }
    });

    app.use((req, res, next) => {
      logger.log({
        level: 'info',
        message: `incoming request for ${req.method} - ${req.url}`,
        meta: { headers: req.headers },
      });
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', true);
      next();
    });
  },
};
