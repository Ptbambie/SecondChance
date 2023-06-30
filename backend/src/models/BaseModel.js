const { db } = require('../config');

class BaseModel {
  db;
  table;

  constructor(table) {
    this.db = db;
    this.table = table;
  }

  getAll() {
    return this.db.query(`SELECT * FROM ${this.table}`);
  }

  getOne(params) {
    const paramsKeys = Object.keys(params);
    const paramsValues = Object.values(params);
    return this.db.query(
      `SELECT * FROM ${this.table} WHERE ${paramsKeys} = ?`,
      [paramsValues]
    );
  }

  create(data) {
    const dataKeys = Object.keys(data);
    const dataValues = Object.values(data);
    const fillKeys = dataKeys.map((key) => key).join(', ');
    const fillValues = dataValues
      .map((value) => (typeof value === 'string' ? `'${value}'` : value))
      .join(', ');

    return this.db.query(
      `INSERT INTO ${this.table} (${fillKeys}) VALUES (${fillValues})`,
      [dataValues]
    );
  }

  update(data, params) {
    const paramsKeys = Object.keys(params);
    const paramsValues = Object.values(params);
    const dataKeys = Object.keys(data);
    const dataValues = Object.values(data);

    const fillData = dataKeys.map((key) => `${key} = ?`).join(', ');

    return this.db.query(
      `UPDATE ${this.table} SET ${fillData} WHERE ${paramsKeys} = ${paramsValues}`,
      [...dataValues]
    );
  }

  delete(params) {
    const paramsKey = Object.keys(params);
    const paramsValue = Object.values(params);
    return this.db.query(`DELETE FROM ${this.table} WHERE ${paramsKey} = ?`, [
      paramsValue,
    ]);
  }
}

module.exports = BaseModel;
