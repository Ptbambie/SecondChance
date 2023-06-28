const BaseController = require('./BaseController');
const { UserModel } = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class UserController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new UserModel();
  }

  async changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: 'Please specify both old and new password' });
    }

    try {
      const user = await this.model.getOne(req.params);
      const isPasswordValid = await argon2.verify(user.password, oldPassword);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const hashedPassword = await argon2.hash(newPassword, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 4,
        parallelism: 2,
        hashLength: 50,
      });

      await this.model.update({ password: hashedPassword }, req.params);

      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Please specify both email and password' });
    }

    try {
      const [user] = await this.model.getOne(username);

      if (!user) {
        return res.status(400).json({ message: 'Invalid username' });
      }

      const payload = { id: user.id, role: user.role_id };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  logout(req, res) {
    res.clearCookie('token').status(200).json({ message: 'Logout successful' });
  }
}

module.exports = UserController;
