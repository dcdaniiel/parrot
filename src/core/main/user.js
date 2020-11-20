const { PersistedEntity } = require('../base');

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
      last_access: obj._last_access,
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
      user._last_access = serialized.last_access;

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
  }

  _makeSalt() {
    const length = Math.floor(Math.random() * 50);
    let salt = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%?';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      salt += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return salt;
  }
}

module.exports = { User };
