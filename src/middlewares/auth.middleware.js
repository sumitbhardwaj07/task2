const jwt = require('jsonwebtoken');
const { User } = require('../models');
const SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    const decoded = jwt.verify(token, SECRET);
    console.log('Decoded JWT:', decoded);

    const user = await User.findByPk(decoded.userId);
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Store minimal user info in req.user
    req.user = { userId: user.id, role: user.role };
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
