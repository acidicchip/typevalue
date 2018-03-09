(()=> {
    let typeValue = require('./dist/index');
    let exampleObject = {
        'date': [
            '2018-03-13 04:20:00-700',
            '2018-03-13 04:20:00',
            '2018-03-13'
        ],
        'boolean': [
            true,
            false,
            'true',
            'false',
            'yes',
            'no'
        ],
        'number': [
            0,
            1,
            0.1,
            1.0,
            '0',
            '1',
            '0.1',
            '1.0',
            '1,000',
            '1.5k',
            '$1.25m'
        ]
    };
    console.log('typeExample', JSON.stringify(typeValue(exampleObject), null, 4));
})();