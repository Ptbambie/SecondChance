const BaseController = require('./BaseController');
const { BrandModel } = require('../models');

class BrandController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new BrandModel();
  }
}

module.exports = BrandController;
