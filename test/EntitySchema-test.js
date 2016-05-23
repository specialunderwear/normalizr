import { assert } from 'chai';
import EntitySchema from '../src/EntitySchema';

describe('EntitySchema', () => {
  it('throws when initialized without a name', () => {
    assert.throws(() => new EntitySchema());
  });

  it('throws when initialized with non-string name', () => {
    assert.throws(() => new EntitySchema(42));
  });

  describe('takes an option for', () => {
    describe('assignEntity', () => {
      it('that has no default', () => {
        const schema = new EntitySchema('tacos');
        assert.isUndefined(schema.getAssignEntity());
      });
    });

    describe('idAttribute', () => {
      it('that defaults idAttribute to "id" if not provided', () => {
        const schema = new EntitySchema('tacos', {});
        assert.equal(schema.getIdAttribute(), 'id');
      });

      it('that can be derived from a function', () => {
        const schema = new EntitySchema('tacos', { idAttribute: (entity) => entity.idProp });
        assert.equal(schema.getId({ idProp: 'taco' }), 'taco');
      });
    });

    describe('meta', () => {

    });
  });
});
