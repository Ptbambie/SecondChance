const BaseController = require('./BaseController');
const { UserModel } = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class UserController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new UserModel();
  }

  async changePassword() {
    const { oldPassword, newPassword } = this.req.body;

    if (!oldPassword || !newPassword) {
      return this.res
        .status(400)
        .json({ message: 'Please specify both old and new password' });
    }

    try {
      const user = await this.model.getOne(req.params);
      const isPasswordValid = await argon2.verify(user.password, oldPassword);

      if (!isPasswordValid) {
        return this.res.status(400).json({ message: 'Invalid password' });
      }

      const hashedPassword = await argon2.hash(newPassword, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 4,
        parallelism: 2,
        hashLength: 50,
      });

      await this.model.update({ password: hashedPassword }, this.req.params);

      this.res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      this.res.status(500).json({ message: error.message });
    }
  }

  login = () => {
    const { email, password } = this.req.body;

    if (!email || !password) {
      return this.res
        .status(400)
        .json({ error: 'Please specify both email and password' });
    }

    const userEmail = { email };

    this.model
      .getOne(userEmail)
      .then(async ([rows]) => {
        if (rows[0] == null) {
          this.res.status(401).json({ error: 'Invalid email' });
        } else {
          const { id, email, password: hashedPassword, role_id } = rows[0];

          if (!(await argon2.verify(hashedPassword, password))) {
            this.res.status(401).json({ error: 'Invalid password' });
          } else {
            const payload = { id: id, role: role_id };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: '1h',
            });
            this.res
              .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
              })
              .status(200)
              .json({ id, email, role_id });
          }
        }
      })
      .catch((err) => {
        console.error(err);
        this.res.status(500).send({
          error: err.message,
        });
      });
  };

  async createUser() {
    const { firstname, lastname, zipcode, email, password } = this.req.body;

    try {
      if (!firstname || !lastname || !zipcode || !email || !password) {
        return this.res
          .status(400)
          .json({ message: 'Please specify all fields' });
      }
      console.log('-----coucou----', this.table);
      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 4,
        parallelism: 2,
        hashLength: 50,
      });

      const username = firstname.slice(0, 1) + lastname + zipcode;

      const userData = {
        firstname,
        lastname,
        zipcode,
        username: username,
        email,
        password: hashedPassword,
        role_id: 2,
      };

      console.log(userData);

      const [result] = await this.model.create(userData);

      this.res.status(200).json({
        message: 'User registered successfully',
        id: result.insertId,
        ...userData,
      });
    } catch (error) {
      console.error(error);
      this.res.status(500).json({ message: error.message });
    }
  }

  logout(req, res) {
    res.clearCookie('token').status(200).json({ message: 'Logout successful' });
  }
}

module.exports = UserController;
