const winston = require('winston');
 
const Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'logger.log' }),
  ],
});

module.exports = Logger;