const { PersistedEntity } = require('../base');

class Sale extends PersistedEntity {
  static getEntityClass() {
    return Sale;
  }

  static serialize(sale) {
    return {
      id: sale._id,
      level_id: sale._level_id,
      price: sale._price,
      cost: sale._cost,
      margin: sale._margin,
      created_at: sale._created_at,
      updated_at: sale._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const sl = new Sale(
        serialized.level_id,
        serialized.price,
        serialized.cost,
        serialized.margin
      );
      sl._id = serialized.id;
      sl._created_at = serialized.created_at;
      sl._updated_at = serialized.updated_at;
      return sl;
    }

    return undefined;
  }

  constructor(level_id, price, cost, margin) {
    super();

    this._level_id = level_id;
    this._price = price;
    this._cost = cost;
    this._margin = margin;
  }
}

module.exports = { Sale };
