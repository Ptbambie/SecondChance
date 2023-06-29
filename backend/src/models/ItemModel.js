const BaseModel = require('./BaseModel');

class ItemModel extends BaseModel {
  constructor() {
    super('item');
  }
}

module.exports = ItemModel;
