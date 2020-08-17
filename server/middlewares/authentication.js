const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    const decoded = verifyToken(access_token);
    req.userData = decoded;
    const user = await User.findOne({
      where: {
        email: decoded.email,
      },
    });
    if (!user) throw { msg: 'authentication failed' };
    next();
  } catch (err) {
    res.status(500).json({ msg: err });
  }
}

module.exports = authentication;
