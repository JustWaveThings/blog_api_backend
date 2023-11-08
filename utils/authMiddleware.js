export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('im authenticated for this API call');
    next();
  } else {
    res.status(401).json({
      message: 'You are not authenticated for this API call.',
    });
  }
};
