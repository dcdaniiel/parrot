const { PersistedEntity } = require('../base');

class Promotion extends PersistedEntity {
  static getEntityClass() {
    return Promotion;
  }

  static serialize(promo) {
    return {
      id: promo._id,
      person_id: promo._person_id,
      level_id: promo._level_id,
      date: promo._date,
      value: promo._value,
      agreement: promo._agreement,
      created_at: promo._created_at,
      updated_at: promo._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const promo = new Promotion(
        serialized.person_id,
        serialized.level_id,
        serialized.date,
        serialized.value,
        serialized.agreement
      );
      promo._id = serialized.id;
      promo._created_at = serialized.created_at;
      promo._updated_at = serialized.updated_at;
      return promo;
    }

    return undefined;
  }

  constructor(person_id, level_id, date, value, agreement) {
    super();

    this._person_id = person_id;
    this._level_id = level_id;
    this._date = date;
    this._value = value;
    this._agreement = agreement;
  }
}

module.exports = { Promotion };
