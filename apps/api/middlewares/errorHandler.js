const httpStatus = require('http-status');

const errorHandler = async (ctx, next) => {
  try {
    await next();
    if (!ctx.response.body && ctx.response.status === 404) {
      Object.assign(ctx.response, {body: {message: ctx.response.message}});
    }
  } catch (err) {
    Object.assign(ctx.response, {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      body: {message: err.message},
    });
  }
};

module.exports = {
  errorHandler,
};
