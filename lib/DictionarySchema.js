'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IterableSchema = require('./IterableSchema');

var _IterableSchema2 = _interopRequireDefault(_IterableSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultDictionaryStoredKeyName = '_dictionaryKeyName';

var DictionarySchema = function (_ArraySchema) {
    _inherits(DictionarySchema, _ArraySchema);

    function DictionarySchema(itemSchema) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, DictionarySchema);

        var _this = _possibleConstructorReturn(this, (DictionarySchema.__proto__ || Object.getPrototypeOf(DictionarySchema)).call(this, itemSchema, options));

        var _options$dictionarySt = options.dictionaryStoredKeyName;
        var dictionaryStoredKeyName = _options$dictionarySt === undefined ? defaultDictionaryStoredKeyName : _options$dictionarySt;

        _this._dictionaryStoredKeyName = dictionaryStoredKeyName;
        return _this;
    }

    _createClass(DictionarySchema, [{
        key: 'getDictionaryStoredKeyName',
        value: function getDictionaryStoredKeyName() {
            return this._dictionaryStoredKeyName;
        }
    }]);

    return DictionarySchema;
}(_IterableSchema2.default);

exports.default = DictionarySchema;