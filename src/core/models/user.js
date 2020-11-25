const { PersistedEntity } = require('../base');

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
      user._person_data = serialized.person_data;
      user._kids_data = serialized.kids_data;

      return user;
    }

    return undefined;
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
