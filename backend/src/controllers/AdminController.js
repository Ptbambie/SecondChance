const BaseController = require('./BaseController');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { AdminModel } = require('../models');

class AdminController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new AdminModel();
  }

  async register() {
    const { firstname, lastname, email, password } = this.req.body;

    if (!firstname || !lastname || !email || !password) {
      return this.res
        .status(400)
        .json({ message: 'Please specify all fields' });
    }

    try {
      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 4,
        parallelism: 2,
        hashLength: 50,
      });

      const adminData = {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role_id: 1,
      };

      const [result] = await this.model.create(adminData);

      this.res.status(200).json({
        message: 'Admin registered successfully',
        id: result.insertId,
      });
    } catch (error) {
      console.error(error);
      this.res.status(500).json({ message: error.message });
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
      const [admin] = await this.model.getOne(email);
      if (!admin) {
        return res.status(400).json({ message: 'Incorrect username' });
      }

      const isPasswordCorrect = await argon2.verify(admin.password, password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      const payload = { id: admin.id, role: admin.role_id };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({ id, role_id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async createUser(req, res) {
    const { firstname, lastname, zipcode, username, email, password, role_id } =
      req.body;

    try {
      if (
        !firstname ||
        !lastname ||
        !zipcode ||
        !username ||
        !email ||
        !password ||
        !role_id
      ) {
        return res.status(400).json({ message: 'Please specify all fields' });
      }

      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 4,
        parallelism: 2,
        hashLength: 50,
      });

      const userData = {
        firstname,
        lastname,
        zipcode,
        username: firstname.slice(0, 1) + lastname + zipcode,
        email,
        password: hashedPassword,
        role_id: 2,
      };

      console.log(userData);

      const [result] = await this.model.create(userData);

      res.status(200).json({
        message: 'User registered successfully',
        id: result.insertId,
        ...userData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  logout(req, res) {
    res.clearCookie('token').status(200).json({ message: 'Logged out' });
  }
}

module.exports = AdminController;
