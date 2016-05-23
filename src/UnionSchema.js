import isObject from 'lodash/isObject';

export default class UnionSchema {
  constructor(itemSchema, { schemaAttribute } = {}) {
    if (!isObject(itemSchema)) {
      throw new Error('UnionSchema requires item schema to be an object.');
    }

    if (!schemaAttribute) {
      throw new Error('UnionSchema requires a schemaAttribute option.');
    }

    this._itemSchema = itemSchema;
    this._getSchema = typeof schemaAttribute === 'function' ? schemaAttribute : x => x[schemaAttribute];
  }

  getItemSchema() {
    return this._itemSchema;
  }


  getSchemaKey(item) {
    return this._getSchema(item);
  }
}
