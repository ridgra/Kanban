const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

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
      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const { idToken } = req.body;
      console.log({ idToken });
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.CLIENT_ID,
      });
      const ticketPayload = ticket.getPayload();
      const user = await User.findOne({
        where: { email: ticketPayload.email },
      });
      let payload = null;
      if (user) {
        payload = {
          id: user.id,
          email: user.email,
        };
      } else {
        const newUser = await User.create({
          email: ticketPayload.email,
          password: 'google-Tralala!',
        });
        payload = {
          id: newUser.id,
          email: newUser.email,
        };
      }
      const access_token = generateToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(err);
      next(err);
    }
  }

  static async fetchUser(req, res, next) {
    try {
      const { id } = req.userData;
      console.log(id);
      const user = await User.findOne({ where: { id } });
      // console.log(user);
      res.status(200).json({ user: { id: user.id, email: user.email } });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UsersController;
