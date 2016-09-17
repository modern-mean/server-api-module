import { ExpressModule } from '@modern-mean/server-express-module';
import * as config from './config';
import logger from './logger';
import cors from 'cors';
import defaults from 'lodash.defaults';
import routes from 'express-list-routes';

export class ApiModule extends ExpressModule {

  constructor(...args) {

    super(...args, config.config());

    this.router = this.express.Router();

    this.router.param('version', (req, res, next, id) => {
      req.apiversion = id;
      return next();
    });

    this.router
      .route(this.config.ApiModule.route)
      .get((req, res) => {
        console.log('in get');
        res.json(this.config.ApiModule.welcome + ' Version: ' + req.apiversion);
      });

    if (this.config.ApiModule.cors.enable) {
      this.logger.debug('ApiModule::Constructor::EnableCors::Global');
      this.router.use(cors(this.config.ApiModule.cors.options));
    }
    console.log(this.config.ApiModule);
    this.logger.debug('ApiModule::Constructor::Done', this.config.ApiModule);
  }

  getRouter() {
    return this.router;
  }

  useApiRouter(...args) {
    return new Promise((resolve, reject) => {
      this.logger.debug('ApiModule::useApiRouter', routes(this.router));

      this.getExpressApp().use(this.router);

      resolve();
    });
  }

  newRouter(...args) {
    return new Promise((resolve, reject) => {
      try {
        let options = defaults(args[0] || {}, { cors: config.corsDefault });
        this.logger.debug('ApiModule::NewRouter', options);
        let router = this.express.Router();
        if (options.cors.enable) {
          this.logger.debug('ApiModule::NewRouter::EnableCors');
          router.use(cors(options.cors.options));
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
        if(!args[0] instanceof this.express.Router()) {
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
        let options = defaults(args[2] || {}, { cors: config.corsDefault });
        this.logger.debug('ApiModule::NewRoute::Args', args);
        if(!args[0] instanceof this.express.Router()) {
          this.logger.error('ApiModule::NewRoute', 'Router not an instance of express router');
          return reject('Router is not an instance of express.Router()');
        }

        let route = args[0].route(args[1]);
        if (options.cors.enable) {
          this.logger.debug('ApiModule::NewRouter::EnableCors');
          route.all((req, res, next) => {
            cors(options.cors.options);
          });
        }
        return resolve(route);
      } catch (err) {
        return reject(err);
      }
    });
  }

}
