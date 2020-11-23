const { PersistedEntity } = require('../base');

class Company extends PersistedEntity {
  static getEntityClass() {
    return Company;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      person_id: obj._person_id,
      cnpj: obj._cnpj,
      name: obj._name,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const company = new Company(
        serialized.person_id,
        serialized.cnpj,
        serialized.name
      );

      company._id = serialized.id;
      company._created_at = serialized.created_at;
      company._updated_at = serialized.updated_at;

      return company;
    }

    return undefined;
  }

  constructor(person_id, cnpj, name) {
    super();

    this._person_id = person_id;
    this._cnpj = cnpj;
    this._name = name;
  }
}

module.exports = { Company };
