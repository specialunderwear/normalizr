import { assert } from 'chai';
import ArraySchema from '../src/ArraySchema';
import EntitySchema from '../src/EntitySchema';

describe('ArraySchema', () => {
  describe('throws when initialized with', () => {
    [true, 42, null, undefined, 'foo'].forEach((schema) => {
      it(`${typeof schema} schema, "${schema}"`, () => {
        assert.throws(() => new ArraySchema(schema));
      });
    });
  });

  it('does not throw when initialized with an object', () => {
    assert.doesNotThrow(() => new ArraySchema(new EntitySchema('foo')));
    assert.doesNotThrow(() => new ArraySchema({}));
    assert.doesNotThrow(() => new ArraySchema([]));
  });
});
