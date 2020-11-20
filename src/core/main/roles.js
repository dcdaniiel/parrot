const { PersistedEntity } = require('../base');

class Role extends PersistedEntity {
  static getEntityClass() {
    return Role;
  }

  static serialize(role) {
    return {
      id: role._id,
      name: role._name,
      created_at: role._created_at,
      updated_at: role._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const role = new Role(serialized.name);

      role.id = serialized._id;
      role.created_at = serialized._created_at;
      role.updated_at = serialized._updated_at;

      return role;
    }

    return undefined;
  }

  constructor(name) {
    super();

    this._name = name;
  }
}

module.exports = { Role };
