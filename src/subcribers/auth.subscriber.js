
export function ensureAuthenticated(
  req, // req is the request object
  res, // res is the response object
  next // next is a function that will be called if the user is authenticated
) {
    // isAuthenticated is a function that passport adds to the request object
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
}