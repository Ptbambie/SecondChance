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

  login = () => {
    const { email, password } = this.req.body;

    if (!email || !password) {
      return this.res
        .status(400)
        .json({ error: 'Please specify both email and password' });
    }

    const adminEmail = { email };

    this.model
      .getOne(adminEmail)
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

  // async login() {
  //   const { email, password } = this.req.body;

  //   if (!email || !password) {
  //     return this.res
  //       .status(400)
  //       .json({ message: 'Please specify both email and password' });
  //   }

  //   const adminEmail = { email };

  //   try {
  //     const [admin] = await this.model.getOne(adminEmail);
  //     if (!admin) {
  //       return this.res.status(400).json({ message: 'Invalid email' });
  //     } else {
  //       const { email, password: hashedPassword } = admin;
  //       console.log('----------', admin);

  //       const isPasswordCorrect = await argon2.verify(hashedPassword, password);

  //       if (!isPasswordCorrect) {
  //         return this.res.status(400).json({ message: 'Incorrect password' });
  //       }

  //       const payload = { id: admin.id, role: admin.role_id };

  //       const token = jwt.sign(payload, process.env.JWT_SECRET, {
  //         expiresIn: '1h',
  //       });

  //       this.res
  //         .cookie('token', token, {
  //           httpOnly: true,
  //           secure: process.env.NODE_ENV === 'production',
  //         })
  //         .status(200)
  //         .json({ id, role_id });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     this.res.status(500).json({ message: error.message });
  //   }
  // }

  logout() {
    this.res.clearCookie('token').status(200).json({ message: 'Logged out' });
  }
}

module.exports = AdminController;
