'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { modulo, power, squareRoot } = require('./calculator');

test('modulo returns the remainder and rejects a zero divisor', () => {
  assert.equal(modulo(10, 3), 1);
  assert.equal(modulo(-10, 3), -1);
  assert.throws(() => modulo(10, 0), RangeError);
});

test('power calculates exponents and rejects non-real or non-finite results', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(4, -1), 0.25);
  assert.equal(power(5, 0), 1);
  assert.throws(() => power(-1, 0.5), RangeError);
  assert.throws(() => power(0, -1), RangeError);
  assert.throws(() => power(10, 1000), RangeError);
});

test('squareRoot calculates roots and rejects negative numbers', () => {
  assert.equal(squareRoot(9), 3);
  assert.equal(squareRoot(0), 0);
  assert.throws(() => squareRoot(-1), RangeError);
});

test('operations reject non-numeric and non-finite inputs', () => {
  for (const invalid of ['2', NaN, Infinity, -Infinity, undefined]) {
    assert.throws(() => modulo(invalid, 2), TypeError);
    assert.throws(() => modulo(2, invalid), TypeError);
    assert.throws(() => power(invalid, 2), TypeError);
    assert.throws(() => power(2, invalid), TypeError);
    assert.throws(() => squareRoot(invalid), TypeError);
  }
});
