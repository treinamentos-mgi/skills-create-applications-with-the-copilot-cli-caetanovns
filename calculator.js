'use strict';

function validateNumber(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError('Expected a finite number');
  }
}

function modulo(a, b) {
  validateNumber(a);
  validateNumber(b);
  if (b === 0) {
    throw new RangeError('Cannot calculate modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  validateNumber(base);
  validateNumber(exponent);
  const result = Math.pow(base, exponent);
  if (!Number.isFinite(result)) {
    throw new RangeError('Power result must be a finite real number');
  }
  return result;
}

function squareRoot(n) {
  validateNumber(n);
  if (n < 0) {
    throw new RangeError('Cannot calculate the square root of a negative number');
  }
  return Math.sqrt(n);
}

module.exports = { modulo, power, squareRoot };
