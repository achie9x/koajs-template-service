const moment = require('moment-timezone');

const logger = async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.info(moment().toISOString(), `${ctx.method} ${ctx.url} - ${rt}`);
};

module.exports = {
  logger,
};
