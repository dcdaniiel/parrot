const { PersistedEntity } = require('../base');

class Address extends PersistedEntity {
  static getEntityClass() {
    return Address;
  }

  static serialize(benefit) {
    return {
      id: benefit._id,
      person_id: benefit.person_id,
      street: benefit.street,
      number: benefit.number,
      country: benefit.country,
      state: benefit.state,
      city: benefit.city,
      district: benefit.district,
      complement: benefit.complement,
      cep: benefit.cep,
      created_at: benefit._created_at,
      updated_at: benefit._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const benefit = new Address(
        serialized.person_id,
        serialized.street,
        serialized.number,
        serialized.country,
        serialized.state,
        serialized.city,
        serialized.district,
        serialized.complement,
        serialized.cep
      );
      benefit._id = serialized.id;
      benefit._created_at = serialized.created_at;
      benefit._updated_at = serialized.updated_at;
      return benefit;
    }

    return undefined;
  }

  constructor(
    person_id,
    street,
    number,
    country,
    state,
    city,
    district,
    complement,
    cep
  ) {
    super();

    this._person_id = person_id;
    this._street = street;
    this._number = number;
    this._country = country;
    this._state = state;
    this._city = city;
    this._district = district;
    this._complement = complement;
    this._cep = cep;
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get country() {
    return this._country;
  }

  get state() {
    return this._state;
  }

  get city() {
    return this._city;
  }

  get district() {
    return this._district;
  }

  get complement() {
    return this._complement;
  }

  get cep() {
    return this._cep;
  }
}

module.exports = { Address };
