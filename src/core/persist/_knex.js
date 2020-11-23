const bcryptjs = require('bcryptjs');
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
  PersonCompany,
  Company,
  Contract,
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

  async _create(obj) {
    const given_password = obj.password + obj.salt;

    const password = await bcryptjs.hash(given_password, 10);

    return this._db.transaction(async (trx) => {
      const { person_data, ...user } = obj;
      const [user_id] = await trx(this._table).insert(
        { ...user, password },
        'id'
      );

      const personData = new Person(
        user_id,
        person_data.level_id,
        person_data.name,
        person_data.birthdate,
        person_data.age
      );

      personData.last_vacation = person_data.last_vacation;
      personData.last_promotion = person_data.last_vacation;
      personData.start_work = person_data.start_work;
      personData.end_work = person_data.end_work;
      personData.phone = person_data.phone;
      personData.emergency_contact = person_data.emergency_contact;
      personData.ahead_card = person_data.ahead_card;
      personData.current_project = person_data.current_project;
      personData.person_email = person_data.person_email;
      personData.fdte_email = person_data.fdte_email;
      personData.bitbucket_account = person_data.bitbucket_account;
      personData.kids = person_data.kids;

      const person = await trx('persons').insert(
        Person.serialize(personData),
        '*'
      );
      return person;
    });
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

class PersonCompanyPersist extends KnexPersist {
  constructor(db) {
    super(db, PersonCompany, 'person_companies');
  }
}

class CompanyPersist extends KnexPersist {
  constructor(db) {
    super(db, Company, 'companies');
  }

  _create(obj) {
    return this._db.transaction(async (trx) => {
      const { person_id, ...company } = obj;

      const [company_id] = await trx(this._table).insert(company, 'id');

      return trx('person_companies').insert(
        PersonCompany.serialize(new PersonCompany(person_id, company_id))
      );
    });
  }
}

class ContractPersist extends KnexPersist {
  constructor(db) {
    super(db, Contract, 'contracts');
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
  PersonCompanyPersist,
  CompanyPersist,
  ContractPersist,
};
