const { PersistedEntity } = require('../base');

class Contract extends PersistedEntity {
  static getEntityClass() {
    return Contract;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      company_id: obj._company_id,
      person_id: obj._person_id,
      date_start: obj._date_start,
      date_end: obj._date_end,
      name: obj._name,
      description: obj._description,
      salary: obj._salary,
      agreement: obj._agreement,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const contract = new Contract(
        serialized.person_id,
        serialized.company_id,
        serialized.name,
        serialized.description,
        serialized.salary,
        serialized.agreement,
        serialized.date_start,
        serialized.date_end
      );

      contract._id = serialized.id;
      contract._created_at = serialized.created_at;
      contract._updated_at = serialized.updated_at;

      return contract;
    }

    return undefined;
  }

  constructor(
    person_id,
    company_id,
    name,
    description,
    salary,
    agreement,
    date_start,
    date_end
  ) {
    super();

    this._person_id = person_id;
    this._company_id = company_id;
    this._name = name;
    this._description = description;
    this._salary = salary;
    this._agreement = agreement;
    this._date_start = date_start;
    this._date_end = date_end;
  }
}

module.exports = { Contract };
