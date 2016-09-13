import { ExpressModule } from '@modern-mean/server-express-module';
import config from './config';
import logger from './logger';

export class ApiModule extends ExpressModule {

  constructor(...args) {
    //Push default configuration to front of array.  Passed in configuration from ...args should take precedence.
    args.unshift({ config: config(), logger: logger() });
    super(...args);

    this.config = this.getConfigModule().get();
    this.logger = this.getLoggerModule().get();

    this.logger.debug('ApiModule::Constructor::Config', JSON.stringify(this.config));

    let apiRouter = this.express.Router();

    apiRouter
      .route('/api/v1')
      .all((req, res, next) => {
        res.status(200).json(this.config.welcome);
        return next();
      });

    this.expressApp.use(apiRouter);

  }

  get() {
    return this;
  }

}
