'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = () => {
  return {
    welcome: process.env.APIMODULE_WELCOME || 'Welcome to the Modern-Mean API Module'
  };
};