import { assert } from 'chai';
import UnionSchema from '../src/UnionSchema';

describe('UnionSchema', () => {
  describe('throws when initialized with', () => {
    [true, 42, null, undefined, 'foo'].forEach((schema) => {
      it(`${typeof schema} schema, "${schema}"`, () => {
        assert.throws(() => new UnionSchema(schema, { schemaAttribute: 'id' }));
      });
    });
  });

  it('throws when initialized without a schemaAttribute', () => {
    assert.throws(() => new UnionSchema({}), 'UnionSchema requires a schemaAttribute option.');
  });

  it('does not throw when initialized with an object', () => {
    assert.doesNotThrow(() => new UnionSchema({}, { schemaAttribute: 'id' }));
    assert.doesNotThrow(() => new UnionSchema([], { schemaAttribute: 'id' }));
  });
});
