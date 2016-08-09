/*eslint no-console: ["error", { allow: ["log"] }] */

'use strict';

const levels = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

let debugMode = false;
let currentLevel = 1;

function log(level, msg) {
  if ((console && level >= currentLevel) || debugMode) {
    console.log(msg);
  }
}

let logger = {
  debug: log.bind(this, levels.DEBUG),
  info: log.bind(this, levels.INFO),
  warn: log.bind(this, levels.WARN),
  error: log.bind(this, levels.ERROR)
};

logger.debug('logger.js loaded');

module.exports = logger;