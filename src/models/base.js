const { db } = require('../db');

function KnexPersist(table) {
  return {
    _db: db,

    async save(obj) {
      const is_update = obj.id && (await this.get(obj.id));
      if (is_update) {
        await this._update(obj.id, obj);
        return 'update';
      }

      await this._create(obj);
      return 'create';
    },

    async delete(obj_id) {
      await this._db(table).where('id', obj_id).del();
      return 'deleted';
    },

    async deleteAll() {
      return this._db(table).del();
    },

    async get(obj_id) {
      return this._db(table).where('id', obj_id).first();
    },

    async getAll() {
      return this._db.select('*').from(table).orderBy('created_at', 'desc');
    },

    async first() {
      return this._db(table).first();
    },

    async _create(obj) {
      return this._db(table).insert(obj);
    },

    async _update(obj_id, obj) {
      return this._db(table).where('id', obj_id).update(obj);
    },
  };
}

function Base() {
  this._id =
}

module.exports = { KnexPersist };
