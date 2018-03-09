# typevalue
Convert JavaScript values to their proper type. Handy for converting strings into their properly typed value.

## Installation
```bash
npm i --save typevalue
```

## Usage
```javascript
let typeValue = require('typevalue');
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
```

Output:
```
typeExample {
    "date": [
        "2018-03-13T11:20:00.000Z",
        "2018-03-13T11:20:00.000Z",
        "2018-03-13T00:00:00.000Z"
    ],
    "boolean": [
        true,
        false,
        true,
        false,
        true,
        false
    ],
    "number": [
        0,
        1,
        0.1,
        1,
        0,
        1,
        0.1,
        1,
        1000,
        1500,
        1250000
    ]
}
```