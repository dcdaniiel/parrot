const { PersistedEntity } = require('../base');

class Level extends PersistedEntity {
  static getEntityClass() {
    return Level;
  }

  static serialize(level) {
    return {
      id: level._id,
      name: level._name,
      salary: level._salary,
      benefit_value: level._benefit_value,
      created_at: level._created_at,
      updated_at: level._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const level = new Level(
        serialized.name,
        serialized.salary,
        serialized.benefit_value
      );

      level._id = serialized.id;
      level._created_at = serialized.created_at;
      level._updated_at = serialized.updated_at;
      return level;
    }

    return undefined;
  }

  constructor(name, salary, benefit_value) {
    super();

    this._name = name;
    this._salary = salary;
    this._benefit_value = benefit_value;
  }
}

module.exports = { Level };
