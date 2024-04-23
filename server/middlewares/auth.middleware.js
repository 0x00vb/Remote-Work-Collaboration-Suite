const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[0];

    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User
      .findOne({ _id: verifiedUser.userId })
      .select('-password');
    req.token = token;
    req.user = user;
    req.userId = user._id;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or missing token' });
    console.log(err)
  }
};