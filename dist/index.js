'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiModule = undefined;

var _module = require('./module');

var _module2 = require('../src/module');

let ApiModule = exports.ApiModule = process.env.NODE_ENV !== 'production' ? _module2.ApiModule : _module.ApiModule;