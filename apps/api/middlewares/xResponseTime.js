const moment = require('moment-timezone');

const xResponseTime = async (ctx, next) => {
  const start = moment().toISOString();
  await next();
  const end = moment().toISOString();
  const ms = moment.duration(moment(end).diff(moment(start))).milliseconds();
  // ctx.set(moment().toISOString(), 'X-Response-Time', `${ms}ms`);
  console.info(moment().toISOString(), 'X-Response-Time', `${ms}ms`);
};

module.exports = {
  xResponseTime,
};
