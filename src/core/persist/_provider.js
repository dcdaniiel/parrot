const {
  RolePersist,
  UserPersist,
  PersonPersist,
  LevelPersist,
  PromotionPersist,
  BenefitPersist,
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
      Promotion: [PromotionPersist, knex],
      Benefit: [BenefitPersist, knex],
    });
  }
}

module.exports = { PersistorProvider };
