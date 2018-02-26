# typevalue
Convert JavaScript values to their proper type. Handy for converting strings into their properly typed value.

## Installation
```bash
npm i typevalue
```

## Usage
```javascript
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
        "1982-07-19T11:20:00.000Z",
        "1982-07-19T11:20:00.000Z",
        "1982-07-19T00:00:00.000Z"
    ],
    "boolean": [
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
        1000,
        1500,
        1250000
    ]
}
```