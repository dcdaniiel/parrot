module.exports = (router, middlewares) => {
  middlewares.forEach((middleware) => {
    router.use(middleware);
  });

  return router;
};
