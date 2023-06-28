const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id;
    req.userRole = data.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.userRole !== 1) {
    return res.status(401).json({ message: 'Forbidden' });
  } else {
    next();
  }
};

module.exports = { authorization, isAdmin };
