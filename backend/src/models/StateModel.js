const BaseModel = require('./BaseModel');

class StateModel extends BaseModel {
  constructor(db) {
    super(db, 'state');
  }
}

module.exports = StateModel;
