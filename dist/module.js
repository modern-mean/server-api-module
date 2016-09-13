'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiModule = undefined;

var _serverExpressModule = require('@modern-mean/server-express-module');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiModule extends _serverExpressModule.ExpressModule {

  constructor(...args) {
    //Push default configuration to front of array.  Passed in configuration from ...args should take precedence.
    args.unshift({ config: (0, _config2.default)(), logger: (0, _logger2.default)() });
    super(...args);

    this.config = this.getConfigModule().get();
    this.logger = this.getLoggerModule().get();

    this.logger.debug('ApiModule::Constructor::Config', JSON.stringify(this.config));

    let apiRouter = this.express.Router();

    apiRouter.route('/api/v1').all((req, res, next) => {
      res.status(200).json(this.config.welcome);
      return next();
    });

    this.expressApp.use(apiRouter);
  }

  get() {
    return this;
  }

}
exports.ApiModule = ApiModule;