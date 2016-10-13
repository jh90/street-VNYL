const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const { token } = req.cookies;

  const nonRestricedRoutes = ['/signup', '/login', '/signout'];
  //after validating backend calls check if tracks, playlists exclusions above can be deleted for
  //logged in user

  if (nonRestricedRoutes.includes(req.path)) { return next(); }
  if (token && req.session.currentUser) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).end();
      }
      req.decoded = decoded;
      next();
    });
  } else {
    res.clearCookie('token');
    return res.status(403).end();
  }
}

module.exports = authenticate;
