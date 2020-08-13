const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UsersController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.create({
        email,
        password,
      });
      res.status(201).json({ user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });
      const msg = 'Invalid email or password';
      if (!user) throw msg;
      const comparePass = comparePassword(password, user.password);
      if (!comparePass) throw msg;
      const payload = {
        id: user.id,
        email: user.email,
        organization: user.organization,
      };
      const access_token = generateToken(payload);
      res.status(201).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UsersController;
