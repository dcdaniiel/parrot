const { RolePersist, UserPersist } = require('./_knex');
const { PersistorSingleton } = require('./_persist');
const { db } = require('../../db');

class PersistorProvider {
  static getPersistor(knex = db) {
    if (PersistorProvider.instance) {
      return PersistorProvider.instance;
    }
    return new PersistorSingleton({
      Role: [RolePersist, knex],
      User: [UserPersist, knex],
    });
  }
}

module.exports = { PersistorProvider };
