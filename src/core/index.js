const { errorHandler } = require('./errorHandler');
const { logger } = require('./logger');
const { middleware } = require('./middleware');

module.exports = {
    errorHandler: errorHandler,
    middleware: middleware,
    logger: logger,
}
