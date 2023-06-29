const BaseController = require('./BaseController');
const { ItemModel } = require('../models');

class ItemController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new ItemModel();
  }
}

module.exports = ItemController;
