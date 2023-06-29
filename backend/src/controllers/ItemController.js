const BaseController = require('./BaseController');
const { ItemModel } = require('../models');

class ItemController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new ItemModel();
  }

  async createItem() {
    const {
      name,
      ram,
      screen,
      network,
      stockage,
      camera,
      battery,
      charger,
      disponibility,
      price,
      category_id,
      state_id,
    } = this.req.body;

    try {
      if (
        !name ||
        !ram ||
        !screen ||
        !network ||
        !stockage ||
        !camera ||
        !battery ||
        !charger ||
        !disponibility ||
        !price ||
        !category_id ||
        !state_id
      ) {
        return this.res
          .status(400)
          .json({ message: 'Please specify all fields' });
      }
    } catch (error) {
      console.error(error);
      this.res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ItemController;
