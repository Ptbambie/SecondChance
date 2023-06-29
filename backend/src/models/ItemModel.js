const BaseModel = require('./BaseModel');

class ItemModel extends BaseModel {
  constructor(db) {
    super(db, 'item');
  }
}

module.exports = ItemModel;
