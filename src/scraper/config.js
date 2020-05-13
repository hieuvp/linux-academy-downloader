const { logging } = require('selenium-webdriver');

module.exports = {
  LOGGING_LEVEL: logging.Level.INFO,
  LOGGING_TYPE: logging.Type.PERFORMANCE,

  WAIT_TIMEOUT: 20 * 1000,
};
