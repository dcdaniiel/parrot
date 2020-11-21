const { PersistedEntity } = require('../base');

class Document extends PersistedEntity {
  static getEntityClass() {
    return Document;
  }

  static serialize(benefit) {
    return {
      id: benefit._id,
      person_id: benefit._person_id,
      type: benefit._type,
      number_doc: benefit._number_doc,
      created_at: benefit._created_at,
      updated_at: benefit._updated_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const doc = new Document(
        serialized.person_id,
        serialized.type,
        serialized.number_doc
      );
      doc._id = serialized.id;
      doc._created_at = serialized.created_at;
      doc._updated_at = serialized.updated_at;
      return doc;
    }

    return undefined;
  }

  constructor(person_id, type, number_doc) {
    super();

    this._person_id = person_id;
    this._type = type;
    this._number_doc = number_doc;
  }
}

module.exports = { Document };
