const {
  RolePersist,
  UserPersist,
  PersonPersist,
  LevelPersist,
  PromotionPersist,
  BenefitPersist,
  DocumentPersist,
  AddressPersist,
  VacationPersist,
  SalePersist,
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
      Document: [DocumentPersist, knex],
      Address: [AddressPersist, knex],
      Vacation: [VacationPersist, knex],
      Sale: [SalePersist, knex],
    });
  }
}

module.exports = { PersistorProvider };
