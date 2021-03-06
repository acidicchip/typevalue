"use strict";
(function (root, typeValue) {
    if ((typeof (require) === 'function') && (typeof (exports) === 'object') && (typeof (module) === 'object')) {
        module.exports = typeValue();
    }
    else if ((typeof (define) === 'function') && define.amd) {
        define(function () {
            return typeValue();
        });
    }
    else {
        root.typeValue = typeValue();
    }
})(this, function () {
    var moment = require('moment');
    var typeValue = function (obj) {
        if (typeof (typeValue.debug.current) !== 'undefined')
            typeValue.debug.last = JSON.parse(JSON.stringify(typeValue.debug.current));
        else
            typeValue.debug.last = '<undefined>';
        typeValue.debug.current = obj;
        typeValue.debug.loops.total++;
        if (Array.isArray(obj)) {
            typeValue.debug.loops.array++;
            return obj.reduce(function (res, item) {
                res.push(typeValue(item));
                return res;
            }, []);
        }
        else if (typeValue.isObject(obj)) {
            typeValue.debug.loops.object++;
            return Object.keys(obj).reduce(function (res, item) {
                res[item] = typeValue(obj[item]);
                return res;
            }, {});
        }
        var match;
        switch (typeof (obj)) {
            case 'string':
                typeValue.debug.loops.string++;
                obj = obj.trim();
                if (!obj) {
                    return undefined;
                }
                else if (/^(true|yes|false|no)$/i.test(obj)) {
                    return /^(true|yes)$/i.test(obj);
                }
                else if (isFinite(obj)
                    || (/^(?:[0-9]+,?)?[0-9,]+\.?(?:[0-9]+)?$/.test(obj)
                        && (match = obj.match(/([0-9.])/g))
                        && (isFinite(match.join(''))))) {
                    if (match) {
                        // console.log('match', match);
                        return Number(match.join(''));
                    }
                    return Number(obj);
                }
                else if (match = obj.match(/^\$?((?:[0-9]+,?)?[0-9,]+\.?(?:[0-9]+)?) ?([kmbt])?$/i)) {
                    return Number(typeValue(match[1])) * ({
                        'k': 1000,
                        'm': 1000000,
                        'b': 1000000000,
                        't': 1000000000000
                    }[(match[2] || '1').toLowerCase()] || 1);
                }
                else if ((match = obj.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}(?:[T ][0-9:+-]+)?$/)) // @TODO - Cleanup
                    && (moment(new Date(obj)).isValid())) {
                    return moment(new Date(obj)).toDate();
                }
                return obj;
            default:
                typeValue.debug.loops.default++;
                return obj;
        }
    };
    typeValue.isObject = function (val) {
        return ((typeof (val) === 'object')
            && (val !== null)
            && (Array.isArray(val) === false)
            && !(val instanceof Date));
    };
    typeValue.debug = {
        loops: {
            total: 0,
            array: 0,
            object: 0,
            string: 0,
            default: 0
        },
        current: undefined,
        last: undefined
    };
    return typeValue;
});
