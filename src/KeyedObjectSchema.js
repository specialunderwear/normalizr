import ArraySchema from './IterableSchema';

const defaultKeyedObjectStoredKeyName = '_dictionaryKeyName';

export default class KeyedObjectSchema extends ArraySchema {
    constructor(itemSchema, options = {}) {
        super(itemSchema, options);
        const { keyedObjectStoredKeyName = defaultKeyedObjectStoredKeyName } = options;
        this._keyedObjectStoredKeyName = keyedObjectStoredKeyName;
    }

    getKeyedObjectStoredKeyName() {
        return this._keyedObjectStoredKeyName;
    }
}
