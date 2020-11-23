const { PersistedEntity } = require('../base');

class PersonCompany extends PersistedEntity {
  static getEntityClass() {
    return PersonCompany;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      person_id: obj._person_id,
      company_id: obj._company_id,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const personCompany = new PersonCompany(
        serialized.person_id,
        serialized.company_id
      );

      personCompany._id = serialized.id;
      personCompany._created_at = serialized.created_at;
      personCompany._updated_at = serialized.updated_at;

      return personCompany;
    }

    return undefined;
  }

  constructor(person_id, company_id) {
    super();

    this._person_id = person_id;
    this._company_id = company_id;
  }
}

module.exports = { PersonCompany };
