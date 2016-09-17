'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiModule = undefined;

var _serverExpressModule = require('@modern-mean/server-express-module');

var _config = require('./config');

var config = _interopRequireWildcard(_config);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _lodash = require('lodash.defaults');

var _lodash2 = _interopRequireDefault(_lodash);

var _expressListRoutes = require('express-list-routes');

var _expressListRoutes2 = _interopRequireDefault(_expressListRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class ApiModule extends _serverExpressModule.ExpressModule {

  constructor(...args) {

    super(...args, config.config());

    this.router = this.express.Router();

    this.router.param('version', (req, res, next, id) => {
      req.apiversion = id;
      return next();
    });

    this.router.route(this.config.ApiModule.route).get((req, res) => {
      console.log('in get');
      res.json(this.config.ApiModule.welcome + ' Version: ' + req.apiversion);
    });

    if (this.config.ApiModule.cors.enable) {
      this.logger.debug('ApiModule::Constructor::EnableCors::Global');
      this.router.use((0, _cors2.default)(this.config.ApiModule.cors.options));
    }
    console.log(this.config.ApiModule);
    this.logger.debug('ApiModule::Constructor::Done', this.config.ApiModule);
  }

  getRouter() {
    return this.router;
  }

  useApiRouter(...args) {
    return new Promise((resolve, reject) => {
      this.logger.debug('ApiModule::useApiRouter', (0, _expressListRoutes2.default)(this.router));

      this.getExpressApp().use(this.router);

      resolve();
    });
  }

  newRouter(...args) {
    return new Promise((resolve, reject) => {
      try {
        let options = (0, _lodash2.default)(args[0] || {}, { cors: config.corsDefault });
        this.logger.debug('ApiModule::NewRouter', options);
        let router = this.express.Router();
        if (options.cors.enable) {
          this.logger.debug('ApiModule::NewRouter::EnableCors');
          router.use((0, _cors2.default)(options.cors.options));
        }
        return resolve(router);
      } catch (err) {
        return reject(err);
      }
    });
  }

  useRouter(...args) {
    return new Promise((resolve, reject) => {
      try {
        if (!args[0] instanceof this.express.Router()) {
          this.logger.error('ApiModule::NewRoute', 'Router not an instance of express router');
          return reject('Router is not an instance of express.Router()');
        }
        this.router.use(this.config.ApiModule.route, args[0]);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }

  newRoute(...args) {
    return new Promise((resolve, reject) => {
      try {
        let options = (0, _lodash2.default)(args[2] || {}, { cors: config.corsDefault });
        this.logger.debug('ApiModule::NewRoute::Args', args);
        if (!args[0] instanceof this.express.Router()) {
          this.logger.error('ApiModule::NewRoute', 'Router not an instance of express router');
          return reject('Router is not an instance of express.Router()');
        }

        let route = args[0].route(args[1]);
        if (options.cors.enable) {
          this.logger.debug('ApiModule::NewRouter::EnableCors');
          route.all((req, res, next) => {
            (0, _cors2.default)(options.cors.options);
          });
        }
        return resolve(route);
      } catch (err) {
        return reject(err);
      }
    });
  }

}
exports.ApiModule = ApiModule;