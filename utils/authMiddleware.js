export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('im authenticated');
    next();
  } else {
    res.status(401).json({
      message: 'You are not authenticated.',
    });
  }
};
