const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../models');

const authenticateToken = (userType = 'user') => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          status: 'error',
          message: 'Access token required'
        });
      }

      const decoded = jwt.verify(token, config.jwt.secret);

      // Check if user/agent exists and is active
      let user;
      if (userType === 'agent') {
        user = await db.Agent.findByPk(decoded.id);
      } else {
        user = await db.User.findByPk(decoded.id);
      }

      if (!user || !user.isActive) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid or inactive account'
        });
      }

      req.user = user;
      req.userId = user.id;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'error',
          message: 'Token expired'
        });
      }
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token'
      });
    }
  };
};

const authenticateUser = authenticateToken('user');
const authenticateAgent = authenticateToken('agent');

module.exports = {
  authenticateUser,
  authenticateAgent,
  authenticateToken
};
