import defaults from 'lodash.defaults';

export let corsDefault = {
  enable: false,
  options: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  }
};

export function config() {
  return {
    ApiModule: {
      welcome: process.env.APIMODULE_WELCOME || 'Welcome to the Modern-Mean API Module',
      route: process.env.APIMODULE_ROUTE || '/api/:version',
      cors: defaults({
        enable: process.env.APIMODULE_CORS ? true : undefined,
        options: {
          origin: process.env.APIMODULE_CORS_ORIGIN,
          methods: process.env.APIMODULE_CORS_METHODS
        }
      }, corsDefault)
    },
    LoggerModule: {
      level:  process.env.APIMODULE_LOG_LEVEL,
      file: process.env.APIMODULE_LOG_FILE,
      console: process.env.APIMODULE_LOG_CONSOLE
    }
  };
};


export function logger() {
  return {
    winston: {
      level:  process.env.APIMODULE_LOG_LEVEL,
      file: process.env.APIMODULE_LOG_FILE,
      console: process.env.APIMODULE_LOG_CONSOLE
    }
  };
};
