/* jshint expr: true */

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    validatorWith = require('../lib/validator'),
    nonPositiveValidationRule = require('../lib/rules/nonPositive'),
    nonDivisibleValidationRule = require('../lib/rules/nonDivisible');

describe('A Validator', function () {
    var validator;
    context('using the default validation rules:', function () {
        beforeEach(function () {
            validator = validatorWith([
                nonPositiveValidationRule,
                nonDivisibleValidationRule(3, 'error.three'),
                nonDivisibleValidationRule(5, 'error.five'),
            ]);
        });

        it('for valid numbers, will return no errors', function () {
            expect(validator(7)).to.be.empty;
        });

        context('for not strictly positive numbers:', function () {
            it('like 0, will include error.nonpositive', function () {
                expect(validator(0)).to.include('error.nonpositive');
            });

            it('like -2, will include error.nonpositive', function () {
                expect(validator(-2)).to.include('error.nonpositive');
            });
        });

        context('for numbers divisible by 3:', function () {
            it('like 3, will include error.three', function () {
                expect(validator(3)).to.include('error.three');
            });

            it('like 15, will include error.three', function () {
                expect(validator(15)).to.include('error.three');
            });
        });

        context('for numbers divisible by 5:', function () {
            it('like 5, will include error.five', function () {
                expect(validator(5)).to.include('error.five');
            });

            it('like 15, will include error.five', function () {
                expect(validator(15)).to.include('error.five');
            });
        });
    });
});
