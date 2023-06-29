const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {
  constructor(db) {
    super(db, 'user');
  }
}

module.exports = UserModel;
