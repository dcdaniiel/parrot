const { PersistedEntity } = require('../base');
const { Person } = require('./person');
const { Kid } = require('./kids');

class UserStatus {
  static ACTIVE() {
    return 'active';
  }

  static DISABLED() {
    return 'disabled';
  }
}

class User extends PersistedEntity {
  static getEntityClass() {
    return User;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
      role_id: obj._role_id,
      email: obj._email,
      password: obj._password,
      salt: obj._salt,
      status: obj._status,
      last_access: obj._last_access,
      person_data: obj._person_data,
      kids_data: obj._kids_data,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const user = new User(
        serialized.role_id,
        serialized.email,
        serialized.password
      );

      user._id = serialized.id;
      user._created_at = serialized.created_at;
      user._updated_at = serialized.updated_at;
      user._salt = serialized.salt;
      user._status = serialized.status;
      user._last_access = serialized.last_access;
      user._person_data = Person.deserialize(serialized.person_data);
      user._kids_data =
        serialized.kids_data &&
        serialized.kids_data.map((kid) => Kid.deserialize(kid));

      return user;
    }

    return undefined;
  }

  static async getAll() {
    const serialized = await this.getPersist().getAll();
    const db = this.getPersist()._db;
    return Promise.all(
      serialized.map(async (item) => {
        // eslint-disable-next-line no-unused-vars
        const { password, salt, ...user } = item;
        const person_data = await db('persons')
          .where({ user_id: user.id })
          .first();
        const kids_data = await db('kids').where({ person_id: person_data.id });
        const data = {
          ...user,
          person_data,
          kids_data,
        };

        return this.deserialize(data);
      })
    );
  }

  static async fetch(...args) {
    const serialized = await this.getPersist().get(...args);
    const db = this.getPersist()._db;
    // eslint-disable-next-line no-unused-vars
    const { password, salt, ...user } = serialized;
    const person_data = await db('persons').where({ user_id: user.id }).first();
    const kids_data = await db('kids').where({ person_id: person_data.id });

    const data = {
      ...user,
      person_data,
      kids_data,
    };

    return this.deserialize(data);
  }

  constructor(role_id, email, password) {
    super();

    this._role_id = role_id;
    this._email = email;
    this._password = password;
    this._salt = this._makeSalt();
    this._last_access = new Date();
    this._status = UserStatus.ACTIVE();
  }

  _makeSalt() {
    const length = Math.floor(Math.random() * 50);
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%?';
    const charactersLength = characters.length;

    return Array(length)
      .fill('')
      .reduce(
        (acc, _) =>
          acc + characters.charAt(Math.floor(Math.random() * charactersLength)),
        ''
      );
  }

  set status(status) {
    this._status = status;
  }

  set person_data(person) {
    this._person_data = person;
  }

  set kids_data(kids) {
    this._kids_data = kids;
  }

  set last_access(access) {
    this._last_access = access;
  }
}

module.exports = { User };
