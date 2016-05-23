export default class EntitySchema {
  constructor(key, { assignEntity, idAttribute, meta } = {}) {
    if (!key || typeof key !== 'string') {
      throw new Error('A string non-empty key is required');
    }

    this._key = key;
    this._assignEntity = assignEntity;

    this._idAttribute = idAttribute || 'id';
    this._getId = typeof this._idAttribute === 'function' ? this._idAttribute : (x) => x[this._idAttribute];
    this._meta = meta;
  }

  getAssignEntity() {
    return this._assignEntity;
  }

  getKey() {
    return this._key;
  }

  getId(entity) {
    return this._getId(entity);
  }

  getIdAttribute() {
    return this._idAttribute;
  }

  getMeta(prop) {
    if (!prop || typeof prop !== 'string') {
      throw new Error('A string non-empty property name is required');
    }
    return this._meta && this._meta[prop];
  }

  define(nestedSchema) {
    for (let key in nestedSchema) {
      if (nestedSchema.hasOwnProperty(key)) {
        this[key] = nestedSchema[key];
      }
    }
  }
}
