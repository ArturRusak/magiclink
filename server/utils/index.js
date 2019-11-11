// Functions which will be used here and there

/**
 * Authentication middleware for authenticated routes.
 * Use it like:
 * router.get('/authenticated-route', authenticated(), async (ctx, next) {
 * @returns
 */
exports.authenticated = () => {
  return (ctx, next) => {
    if (ctx.isAuthenticated()) {
      return next();
    } else {
      ctx.redirect("/users");
    }
  };
};
