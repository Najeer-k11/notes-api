// Simple mock auth middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (token === 'Bearer mock-token') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden. Invalid or missing token.' });
  }
}

module.exports = authenticate;
