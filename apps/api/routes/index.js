const Router = require('koa-router');

const v1 = new Router({prefix: '/v1'});

module.exports = {
  routeV1: v1,
};
