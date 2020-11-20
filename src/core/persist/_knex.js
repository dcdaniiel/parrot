const { Role, User } = require('../main');

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

module.exports = {
  KnexPersist,
  RolePersist,
  UserPersist,
};
