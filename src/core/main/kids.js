const { PersistedEntity } = require('../base');

class Kid extends PersistedEntity {
  static getEntityClass() {
    return Kid;
  }

  static serialize(benefit) {
    return {
      id: benefit._id,
      person_id: benefit._person_id,
      name: benefit._name,
      birthdate: benefit._birthdate,
      created_at: benefit._created_at,
      updated_at: benefit._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const kid = new Kid(
        serialized.person_id,
        serialized.name,
        serialized.birthdate
      );
      kid._id = serialized.id;
      kid._created_at = serialized.created_at;
      kid._updated_at = serialized.updated_at;
      return kid;
    }

    return undefined;
  }

  constructor(person_id, name, birthdate) {
    super();

    this._person_id = person_id;
    this._name = name;
    this._birthdate = birthdate;
  }
}

module.exports = { Kid };
