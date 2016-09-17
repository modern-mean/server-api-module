'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsDefault = undefined;
exports.config = config;
exports.logger = logger;

var _lodash = require('lodash.defaults');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let corsDefault = exports.corsDefault = {
  enable: false,
  options: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  }
};

function config() {
  return {
    ApiModule: {
      welcome: process.env.APIMODULE_WELCOME || 'Welcome to the Modern-Mean API Module',
      route: process.env.APIMODULE_ROUTE || '/api/:version',
      cors: (0, _lodash2.default)({
        enable: process.env.APIMODULE_CORS ? true : undefined,
        options: {
          origin: process.env.APIMODULE_CORS_ORIGIN,
          methods: process.env.APIMODULE_CORS_METHODS
        }
      }, corsDefault)
    },
    LoggerModule: {
      level: process.env.APIMODULE_LOG_LEVEL,
      file: process.env.APIMODULE_LOG_FILE,
      console: process.env.APIMODULE_LOG_CONSOLE
    }
  };
};

function logger() {
  return {
    winston: {
      level: process.env.APIMODULE_LOG_LEVEL,
      file: process.env.APIMODULE_LOG_FILE,
      console: process.env.APIMODULE_LOG_CONSOLE
    }
  };
};