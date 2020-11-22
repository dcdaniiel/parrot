const { PersistedEntity } = require('../base');

class BankingAccount extends PersistedEntity {
  static getEntityClass() {
    return BankingAccount;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      person_id: obj._person_id,
      bank: obj._bank,
      bank_code: obj._bank_code,
      agency: obj._agency,
      account: obj._account,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const bank = new BankingAccount(
        serialized.person_id,
        serialized.bank,
        serialized.bank_code,
        serialized.agency,
        serialized.account
      );
      bank._id = serialized.id;
      bank._created_at = serialized.created_at;
      bank._updated_at = serialized.updated_at;
      return bank;
    }

    return undefined;
  }

  constructor(person_id, bank, bank_code, agency, account) {
    super();

    this._person_id = person_id;
    this._bank = bank;
    this._bank_code = bank_code;
    this._agency = agency;
    this._account = account;
  }
}

module.exports = { BankingAccount };
