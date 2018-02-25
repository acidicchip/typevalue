(()=> {
    let typeValue = require('./dist/index');
    let exampleObject = {
        'date': [
            '1982-07-19 04:20:00-700',
            '1982-07-19 04:20:00',
            '1982-07-19'
        ],
        'boolean': [
            'true',
            'false',
            'yes',
            'no'
        ],
        'number': [
            '0',
            '1',
            '0.1',
            '1.0'
        ]
    };
    console.log('typeExample', JSON.stringify(typeValue(exampleObject), null, 4));
})();