const winston = require('winston');
//const WinstonCloudwatch = require('winston-cloudwatch');

const colorizer = winston.format.colorize();

const modeTransport = [
  new winston.transports.Console({
    silent: process.env.NODE_ENV === "test"
  }),
  new winston.transports.File({ filename: 'logger.log' })
  //add cloudwatch or mongodb transporter here
];

const getMetaData = (msg) => {
  if (msg.meta && msg.meta.headers) {
    return JSON.stringify({ host: msg.meta.headers.host, referer: msg.meta.headers.referer, 'user-agent': msg.meta.headers["user-agent"] });
  }
  return "{}"
}


module.exports = {
  logger: winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
      winston.format.printf((msg) =>
        colorizer.colorize(
          msg.level,
          `${new Date(msg.timestamp).toLocaleTimeString()} - ${msg.message} - ${getMetaData(msg)}}`
        )

      )
    ),
    transports: [...modeTransport]
  })
}
