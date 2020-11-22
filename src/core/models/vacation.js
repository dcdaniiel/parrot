const { PersistedEntity } = require('../base');

class Vacation extends PersistedEntity {
  static getEntityClass() {
    return Vacation;
  }

  static serialize(vacation) {
    return {
      id: vacation._id,
      person_id: vacation._person_id,
      year: vacation._year,
      date_start: vacation._date_start,
      date_end: vacation._date_end,
      created_at: vacation._created_at,
      updated_at: vacation._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const vacation = new Vacation(
        serialized.person_id,
        serialized.year,
        serialized.date_start,
        serialized.date_end
      );
      vacation._id = serialized.id;
      vacation._created_at = serialized.created_at;
      vacation._updated_at = serialized.updated_at;

      return vacation;
    }

    return undefined;
  }

  constructor(person_id, year, date_start, date_end) {
    super();

    this._person_id = person_id;
    this._year = year;
    this._date_start = date_start;
    this._date_end = date_end;
  }
}

module.exports = { Vacation };
