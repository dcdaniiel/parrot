const {
  Role,
  User,
  Level,
  Person,
  Promotion,
  Benefit,
  Document,
  Address,
  Vacation,
  Sale,
  Kid,
  BankingAccount,
} = require('../models');

class KnexPersist {
  constructor(db, class_, table) {
    this._db = db;
    this._class = class_;
    this._table = table;
  }

  async save(obj) {
    const is_update = obj.id && (await this.get(obj.id));
    if (is_update) {
      await this._update(obj.id, obj);
      return 'update';
    }

    await this._create(obj);
    return 'create';
  }

  async delete(obj_id) {
    await this._db(this._table).where('id', obj_id).del();
    return 'deleted';
  }

  async deleteAll() {
    return this._db(this._table).del();
  }

  async get(obj_id) {
    return this._db(this._table).where('id', obj_id).first();
  }

  async getAll() {
    return this._db.select('*').from(this._table).orderBy('created_at', 'desc');
  }

  async first() {
    return this._db(this._table).first();
  }

  async _create(obj) {
    return this._db(this._table).insert(obj);
  }

  async _update(obj_id, obj) {
    return this._db(this._table).where('id', obj_id).update(obj);
  }
}

class RolePersist extends KnexPersist {
  constructor(db) {
    super(db, Role, 'roles');
  }
}

class UserPersist extends KnexPersist {
  constructor(db) {
    super(db, User, 'users');
  }
}

class PersonPersist extends KnexPersist {
  constructor(db) {
    super(db, Person, 'persons');
  }
}

class LevelPersist extends KnexPersist {
  constructor(db) {
    super(db, Level, 'levels');
  }
}

class PromotionPersist extends KnexPersist {
  constructor(db) {
    super(db, Promotion, 'promotions');
  }
}

class BenefitPersist extends KnexPersist {
  constructor(db) {
    super(db, Benefit, 'benefits');
  }
}

class DocumentPersist extends KnexPersist {
  constructor(db) {
    super(db, Document, 'documents');
  }
}

class AddressPersist extends KnexPersist {
  constructor(db) {
    super(db, Address, 'addresses');
  }
}

class VacationPersist extends KnexPersist {
  constructor(db) {
    super(db, Vacation, 'vacations');
  }
}

class SalePersist extends KnexPersist {
  constructor(db) {
    super(db, Sale, 'sales');
  }
}

class KidPersist extends KnexPersist {
  constructor(db) {
    super(db, Kid, 'kids');
  }
}

class BankingAccountPersist extends KnexPersist {
  constructor(db) {
    super(db, BankingAccount, 'banking_accounts');
  }
}

module.exports = {
  RolePersist,
  UserPersist,
  PersonPersist,
  LevelPersist,
  PromotionPersist,
  BenefitPersist,
  DocumentPersist,
  AddressPersist,
  VacationPersist,
  SalePersist,
  KidPersist,
  BankingAccountPersist,
};
