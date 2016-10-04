'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Schema = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.arrayOf = arrayOf;
exports.valuesOf = valuesOf;
exports.dictionaryOf = dictionaryOf;
exports.unionOf = unionOf;
exports.normalize = normalize;

var _EntitySchema = require('./EntitySchema');

var _EntitySchema2 = _interopRequireDefault(_EntitySchema);

var _IterableSchema2 = require('./IterableSchema');

var _IterableSchema3 = _interopRequireDefault(_IterableSchema2);

var _UnionSchema = require('./UnionSchema');

var _UnionSchema2 = _interopRequireDefault(_UnionSchema);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DictionarySchema = function (_IterableSchema) {
  _inherits(DictionarySchema, _IterableSchema);

  function DictionarySchema() {
    _classCallCheck(this, DictionarySchema);

    return _possibleConstructorReturn(this, (DictionarySchema.__proto__ || Object.getPrototypeOf(DictionarySchema)).apply(this, arguments));
  }

  return DictionarySchema;
}(_IterableSchema3.default);

var defaultDictionaryStoredKeyName = '_dictionaryKeyName';

function defaultAssignEntity(normalized, key, entity) {
  normalized[key] = entity;
}

function visitObject(obj, schema, bag, options, collectionKey) {
  var _options$assignEntity = options.assignEntity;
  var assignEntity = _options$assignEntity === undefined ? defaultAssignEntity : _options$assignEntity;


  var defaults = schema && schema.getDefaults && schema.getDefaults();
  var schemaAssignEntity = schema && schema.getAssignEntity && schema.getAssignEntity();
  var normalized = (0, _isObject2.default)(defaults) ? _extends({}, defaults) : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var entity = visit(obj[key], schema[key], bag, options, collectionKey);
      assignEntity.call(null, normalized, key, entity, obj, schema);
      if (schemaAssignEntity) {
        schemaAssignEntity.call(null, normalized, key, entity, obj, schema, collectionKey);
      }
    }
  }
  return normalized;
}

function visitDictionary(obj, schema, bag, options) {
  var _options$dictionarySt = options.dictionaryStoredKeyName;
  var dictionaryStoredKeyName = _options$dictionarySt === undefined ? defaultDictionaryStoredKeyName : _options$dictionarySt;

  var itemSchema = schema.getItemSchema();

  return Object.keys(obj).reduce(function (objMap, key) {
    var dictionaryEntry = obj[key];
    dictionaryEntry[dictionaryStoredKeyName] = key;
    var storageId = itemSchema.getId(dictionaryEntry, key);
    var entity = visitEntity(dictionaryEntry, itemSchema, bag, options, storageId);
    objMap[key] = entity;
    return objMap;
  }, {});
}

function defaultMapper(iterableSchema, itemSchema, bag, options) {
  return function (obj, key) {
    return visit(obj, itemSchema, bag, options, key);
  };
}

function polymorphicMapper(iterableSchema, itemSchema, bag, options) {
  return function (obj, key) {
    var schemaKey = iterableSchema.getSchemaKey(obj);
    var result = visit(obj, itemSchema[schemaKey], bag, options, key);
    return { id: result, schema: schemaKey };
  };
}

function visitIterable(obj, iterableSchema, bag, options) {
  var itemSchema = iterableSchema.getItemSchema();
  var curriedItemMapper = defaultMapper(iterableSchema, itemSchema, bag, options);

  if (Array.isArray(obj)) {
    return obj.map(curriedItemMapper);
  } else {
    return Object.keys(obj).reduce(function (objMap, key) {
      objMap[key] = curriedItemMapper(obj[key], key);
      return objMap;
    }, {});
  }
}

function visitUnion(obj, unionSchema, bag, options) {
  var itemSchema = unionSchema.getItemSchema();
  return polymorphicMapper(unionSchema, itemSchema, bag, options)(obj);
}

function defaultMergeIntoEntity(entityA, entityB, entityKey) {
  for (var key in entityB) {
    if (!entityB.hasOwnProperty(key)) {
      continue;
    }

    if (!entityA.hasOwnProperty(key) || (0, _isEqual2.default)(entityA[key], entityB[key])) {
      entityA[key] = entityB[key];
      continue;
    }

    console.warn('When merging two ' + entityKey + ', found unequal data in their "' + key + '" values. Using the earlier value.', entityA[key], entityB[key]);
  }
}

function visitEntity(entity, entitySchema, bag, options, collectionKey) {
  var _options$mergeIntoEnt = options.mergeIntoEntity;
  var mergeIntoEntity = _options$mergeIntoEnt === undefined ? defaultMergeIntoEntity : _options$mergeIntoEnt;


  var entityKey = entitySchema.getKey();
  var id = entitySchema.getId(entity, collectionKey);

  if (!bag.hasOwnProperty(entityKey)) {
    bag[entityKey] = {};
  }

  if (!bag[entityKey].hasOwnProperty(id)) {
    bag[entityKey][id] = {};
  }

  var stored = bag[entityKey][id];
  var normalized = visitObject(entity, entitySchema, bag, options, collectionKey);
  mergeIntoEntity(stored, normalized, entityKey);

  return id;
}

function visit(obj, schema, bag, options, collectionKey) {
  if (!(0, _isObject2.default)(obj) || !(0, _isObject2.default)(schema)) {
    return obj;
  }

  if (schema instanceof _EntitySchema2.default) {
    return visitEntity(obj, schema, bag, options, collectionKey);
  } else if (schema instanceof DictionarySchema) {
    return visitDictionary(obj, schema, bag, options);
  } else if (schema instanceof _IterableSchema3.default) {
    return visitIterable(obj, schema, bag, options);
  } else if (schema instanceof _UnionSchema2.default) {
    return visitUnion(obj, schema, bag, options);
  } else {
    return visitObject(obj, schema, bag, options, collectionKey);
  }
}

function normalizeResult(result) {
  if ((0, _isObject2.default)(result) && (0, _isEqual2.default)(Object.keys(result), Object.keys(result).map(function (key) {
    return result[key];
  }))) {
    return Object.keys(result);
  }
  return result;
}

function arrayOf(schema, options) {
  return new _IterableSchema3.default(schema, options);
}

function valuesOf(schema, options) {
  return new _IterableSchema3.default(schema, options);
}

function dictionaryOf(schema, options) {
  return new DictionarySchema(schema, options);
}

function unionOf(schema, options) {
  return new _UnionSchema2.default(schema, options);
}

exports.Schema = _EntitySchema2.default;
function normalize(obj, schema) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!(0, _isObject2.default)(obj)) {
    throw new Error('Normalize accepts an object or an array as its input.');
  }

  if (!(0, _isObject2.default)(schema) || Array.isArray(schema)) {
    throw new Error('Normalize accepts an object for schema.');
  }

  var bag = {};
  var result = visit(obj, schema, bag, options);

  return {
    entities: bag,
    result: normalizeResult(result)
  };
}