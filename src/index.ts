(function (root, typeValue) {
    if ((typeof(require) === 'function') && (typeof(exports) === 'object') && (typeof(module) === 'object')) { // Node.js support
        module.exports = typeValue();
    } else if ((typeof(define) === 'function') && define.amd) { // AMD support
        define(function () {
            return typeValue();
        });
    } else { // Browser support
        root.typeValue = typeValue();
    }
})(this, function () {
    const moment = require('moment');

    let typeValue: any = function (obj: any) {
        if (Array.isArray(obj)) {
            return obj.reduce((res: any, item) => {
                res.push(typeValue(item));
                return res;
            }, []);
        } else if (typeValue.isObject(obj)) {
            return Object.keys(obj).reduce((res: any, item) => {
                res[item] = typeValue(obj[item]);
                return res;
            }, {});
        }

        let match;
        switch (typeof(obj)) {
            case 'string':
                obj = obj.trim();
                if (!obj) { // Empty Value
                    return undefined;
                } else if (/^(true|yes|false|no)$/i.test(obj)) { // Boolean
                    return /^(true|yes)$/i.test(obj);
                } else if (
                    isFinite(obj)
                    || (
                        /^[0-9.,]+$/.test(obj)
                        && (match = obj.match(/([0-9.])/g))
                        && (isFinite(match.join('')))
                    )
                ) { // Number
                    if (match) {
                        // console.log('match', match);
                        return Number(match.join(''));
                    }

                    return Number(obj);
                } else if (match = obj.match(/^\$?([0-9.,]+)([kmbt])?$/i)) { // Abbreviated Dollars
                    return Number(typeValue(match[1])) * (({
                        'k': 1000,
                        'm': 1000000,
                        'b': 1000000000,
                        't': 1000000000000
                    } as any)[(match[2] || '').toLowerCase()] || 1);
                } else if (
                    (match = obj.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}(?:[T ][0-9:+-]+)?$/)) // @TODO - Cleanup
                    && (moment(new Date(obj)).isValid())
                ) { // Date
                    return moment(new Date(obj)).toDate();
                }

                return obj;
            default:
                return obj;
        }
    };

    typeValue.isObject = function (val: any) {
        return (
            (typeof(val) === 'object')
            && (val !== null)
            && (Array.isArray(val) === false)
            && !(val instanceof Date)
        );
    };

    return typeValue;
});
