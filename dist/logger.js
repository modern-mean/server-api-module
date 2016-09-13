"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = () => {
  //https://github.com/winstonjs/winston
  return {
    winston: {
      level: process.env.APIMODULE_LOG_LEVEL,
      file: process.env.APIMODULE_LOG_FILE,
      console: process.env.APIMODULE_LOG_CONSOLE
    }
  };
};