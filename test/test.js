'use strict';
var chalk = require('chalk'), expect = require('chai').expect, assert = require('assert'), typeValue = require('../dist/index');
describe('typeValue(val) Tests', function () {
    [{
            what: true,
            value: true
        }, {
            what: false,
            value: false
        }, {
            what: 'true',
            value: true
        }, {
            what: 'false',
            value: false
        }, {
            what: 'yes',
            value: true
        }, {
            what: 'no',
            value: false
        }, {
            what: 0,
            value: 0
        }, {
            what: 1,
            value: 1
        }, {
            what: 0.1,
            value: 0.1
        }, {
            what: 1.0,
            value: 1
        }, {
            what: '0',
            value: 0
        }, {
            what: '1',
            value: 1
        }, {
            what: '0.1',
            value: 0.1
        }, {
            what: '1.0',
            value: 1
        }, {
            what: '1,000',
            value: 1000
        }, {
            what: '1.5k',
            value: 1500
        }, {
            what: '1,250.5k',
            value: 1250500
        }, {
            what: '$1.25m',
            value: 1250000
        }, {
            what: '$1,000.25k',
            value: 1000250
        }, {
            what: '123.123.1234',
            value: '123.123.1234'
        }, {
            what: '123-123-1234',
            value: '123-123-1234'
        }].forEach(function (test) {
        it(chalk.cyan((typeof (test.what) === 'string') ? "\"" + test.what + "\"" : String(test.what)) + ' should return ' + chalk.green((typeof (test.value) === 'string') ? "\"" + test.value + "\"" : String(test.value)), function () {
            expect(typeValue(test.what)).to.equal(test.value);
        });
    });
    [{
            what: new Date('2018-03-13 04:20:00-800'),
            value: new Date('2018-03-13 04:20:00-800')
        }, {
            what: new Date('2018-03-13 04:20:00-700'),
            value: new Date('2018-03-13 04:20:00-700')
        }, {
            what: '2018-03-13 04:20:00-800',
            value: new Date('2018-03-13 04:20:00-800')
        }, {
            what: '2018-03-13 04:20:00-700',
            value: new Date('2018-03-13 04:20:00-700')
        }, {
            what: '2018-03-13 04:20:00',
            value: new Date('2018-03-13 04:20:00')
        }, {
            what: '2018-03-13',
            value: new Date('2018-03-13')
        }].forEach(function (test) {
        it(chalk.cyan((typeof (test.what) === 'string') ? "\"" + test.what + "\"" : String(test.what)) + ' should return ' + chalk.green((typeof (test.value) === 'string') ? "\"" + test.value + "\"" : String(test.value)), function () {
            expect(typeValue(test.what).getTime()).to.equals(test.value.getTime());
        });
    });
});
