const express = require('express');

const { authorization, isAdmin } = require('./middlewares/auth');

const {
  AdminController,
  CategoryController,
  ItemController,
  StateController,
  UserController,
} = require('./controllers');

const router = express.Router();

router.get('/items', (req, res, next) =>
  new ItemController(req, res, next).getAll()
);
router.get('/items/:id', (req, res, next) =>
  new ItemController(req, res, next).getOne()
);
router.get('/states', (req, res, next) =>
  new StateController(req, res, next).getAll()
);
router.get('categories', (req, res, next) =>
  new CategoryController(req, res, next).getAll()
);

router.post('/items', authorization, (req, res, next) =>
  new ItemController(req, res, next).create()
);
router.post('/users', authorization, isAdmin, (req, res, next) =>
  new UserController(req, res, next).create()
);
router.post('/login-admin', (req, res, next) =>
  new AdminController(req, res, next).login()
);
router.post('/login', (req, res, next) =>
  new UserController(req, res, next).login()
);
router.post('/register', (req, res, next) =>
  new AdminController(req, res, next).register()
);

router.put('/items/:id', authorization, (req, res, next) =>
  new ItemController(req, res, next).update()
);
router.put('/users/:id', authorization, isAdmin, (req, res, next) =>
  new UserController(req, res, next).update()
);

router.delete('/items/:id', authorization, (req, res, next) =>
  new ItemController(req, res, next).delete()
);
router.delete('/users/:id', authorization, isAdmin, (req, res, next) =>
  new UserController(req, res, next).delete()
);

module.exports = router;
