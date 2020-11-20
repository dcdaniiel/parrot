const { RolePersist } = require('./_knex');
const { PersistorSingleton } = require('./_persist');

class PersistorProvider {
  static getPersistor(db) {
    if (PersistorProvider.instance) {
      return PersistorProvider.instance;
    }
    return new PersistorSingleton({
      Role: [RolePersist, db],
    });
  }
}

module.exports = { PersistorProvider };
