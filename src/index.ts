(function (root, typeValue) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        module.exports = typeValue();
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return typeValue();
        });
    } else {
        root.typeValue = typeValue();
    }
})(this, function () {
    const moment = require('moment');

    let typeValue: any = function (obj: any) {
        if (Array.isArray(obj)) {
            return obj.reduce((res:any, item) => {
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
                if (!obj.trim()) { // Empty Value
                    return undefined;
                } else if (/^(true|yes|false|no)$/i.test(obj)) { // Boolean
                    return /^(true|yes)$/i.test(obj);
                } else if (isFinite(obj)) { // Number
                    return Number(obj);
                } else if (match = String(obj).match(/^\$([0-9.]+)(\w)?$/)) { // Abbreviated Dollars
                    return Number(match[1]) * (({
                        'k': 1000,
                        'm': 1000000,
                        'b': 1000000000,
                        't': 1000000000000
                    } as any)[(match[2] || '').toLowerCase()] || 1);
                } else if (
                    (obj.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}(?:[T ][0-9:+-]+)?$/)) // @TODO - Cleanup
                    // && (moment(obj).isValid())
                    && (moment(new Date(obj)).isValid())
                ) { // Date
                    return moment(obj).toDate();
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
