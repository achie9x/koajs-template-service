/* eslint-disable max-len */
const Koa = require('koa');

// require app plugins
const router = require('koa-router');
const helmet = require('koa-helmet');
const session = require('koa-session');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const serverPush = require('koa-server-push');

// require middlewares
const {logger} = require('./middlewares/logger');
const {xResponseTime} = require('./middlewares/xResponseTime');
const {errorHandler} = require('./middlewares/errorHandler');

// create app
const app = new Koa();

// helmet
app.use(helmet());

// bodyParser
app.use(bodyParser());

// server push
app.use(serverPush());

// compress
app.use(compress());

// session
const sessionConfig = {
  key: 'koa.session',
  // (string) cookie key (default is koa.sess)
  // (number || 'session') maxAge in ms (default is 1 days)
  // 'session' will result in a cookie that expires when session/browser is closed
  // Warning: If a session cookie is stolen, this cookie will never expire
  maxAge: 86400000,
  autoCommit: true,
  // (boolean) automatically commit headers (default true)
  overwrite: true,
  // (boolean) can overwrite or not (default true)
  httpOnly: true,
  // (boolean) httpOnly or not (default true)
  signed: true,
  // (boolean) signed or not (default true)
  rolling: false,
  // (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false)
  renew: false,
  // (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)
  secure: true,
  // (boolean) secure cookie
  sameSite: null,
  // (string) session cookie sameSite options (default null, don't set it)
};
app.use(session(sessionConfig, app));

// logger
app.use(logger);

// x-response-time
app.use(xResponseTime);

// error handling
app.use(errorHandler);

module.exports = {
  app,
};
