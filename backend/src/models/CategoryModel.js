const BaseModel = require('./BaseModel');

class CategoryModel extends BaseModel {
  constructor(db) {
    super(db, 'category');
  }
}

module.exports = CategoryModel;
