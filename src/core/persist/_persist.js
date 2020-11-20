const { abstractFactory } = require('../utils/abstractFactory');
const { db } = require('../../db');

class PersistorSingleton {
  static get instance() {
    return PersistorSingleton._instance;
  }

  static set instance(instance) {
    PersistorSingleton._instance = instance;
  }

  constructor(persist_class_map = {}) {
    this._persist_class_map = persist_class_map;

    if (PersistorSingleton.instance) {
      return PersistorSingleton.instance;
    }

    const PersistFactory = abstractFactory(this._persist_class_map);

    this._persists = {};

    for (const [k, class_] of Object.entries(this._persist_class_map)) {
      this._persists[k] = PersistFactory(k, db, class_);
    }

    PersistorSingleton.instance = this;
  }

  getPersistInstance(class_) {
    return this._persists[class_];
  }

  async clear() {
    const persists = Object.values(this._persists);
    await persists.forEach(({ deleteAll }) => deleteAll());
  }
}

module.exports = {
  PersistorSingleton,
};
