const app = require('./app');
const { errorHandler, logger } = require('./core');

const port = process.env.PORT || 8000;

app.listen(port, (err) => {
  if (err) {
    errorHandler(
        { message: `ERROR: ${err.message}`, statusCode: 403 },
        req,
        res
    );
  } else {
    logger.log({
      level: 'info',
      message: `Listening on port ${port}`,
    });
  }
});