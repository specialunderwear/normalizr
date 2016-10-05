import ArraySchema from './IterableSchema';

const defaultDictionaryStoredKeyName = '_dictionaryKeyName';

export default class DictionarySchema extends ArraySchema {
    constructor(itemSchema, options = {}) {
        super(itemSchema, options);
        const { dictionaryStoredKeyName = defaultDictionaryStoredKeyName } = options;
        this._dictionaryStoredKeyName = dictionaryStoredKeyName;
    }

    getDictionaryStoredKeyName() {
        return this._dictionaryStoredKeyName;
    }
}
