export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render('error', {
      message:
        'You are not authorized to view this resource because you are not logged in.',
      error: {
        status: null,
        stack: null,
      },
    });
  }
};
