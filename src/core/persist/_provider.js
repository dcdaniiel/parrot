const {
  RolePersist,
  UserPersist,
  PersonPersist,
  LevelPersist,
} = require('./_knex');

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
      Person: [PersonPersist, knex],
      Level: [LevelPersist, knex],
    });
  }
}

module.exports = { PersistorProvider };
