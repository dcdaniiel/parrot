const { PersistedEntity } = require('../base');

class Benefit extends PersistedEntity {
  static getEntityClass() {
    return Benefit;
  }

  static serialize(benefit) {
    return {
      id: benefit._id,
      person_id: benefit._person_id,
      month_init: benefit._month_init,
      month_end: benefit._month_end,
      value: benefit._value,
      parcel: benefit._parcel,
      receipt: benefit._receipt,
      created_at: benefit._created_at,
      updated_at: benefit._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const benefit = new Benefit(
        serialized.person_id,
        serialized.month_init,
        serialized.month_end,
        serialized.value,
        serialized.parcel,
        serialized.receipt
      );
      benefit._id = serialized.id;
      benefit._created_at = serialized.created_at;
      benefit._updated_at = serialized.updated_at;
      return benefit;
    }

    return undefined;
  }

  constructor(person_id, month_init, month_end, value, parcel, receipt) {
    super();

    this._person_id = person_id;
    this._month_init = month_init;
    this._month_end = month_end;
    this._value = value;
    this._parcel = parcel;
    this._receipt = receipt;
  }
}

module.exports = { Benefit };
