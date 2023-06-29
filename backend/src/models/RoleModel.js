const BaseModel = require('./BaseModel');

class RoleModel extends BaseModel {
  constructor(db) {
    super(db, 'role');
  }
}

module.exports = RoleModel;
