const BaseController = require('./BaseController');
const { StateModel } = require('../models');

class StateController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new StateModel();
  }
}

module.exports = StateController;
