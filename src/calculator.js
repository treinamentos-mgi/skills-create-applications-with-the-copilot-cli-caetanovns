#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Operações suportadas:
 *   - add (adição, +)
 *   - subtract (subtração, -)
 *   - multiply (multiplicação, *)
 *   - divide (divisão, /) — divisão por zero retorna erro claro
 *   - modulo (resto da divisão, %) — divisor zero retorna erro claro
 *   - power (exponenciação)
 *   - sqrt (raiz quadrada) — números negativos retornam erro claro
 *
 * Uso: node src/calculator.js <operação> <número1> [número2]
 * Exemplo: node src/calculator.js add 2 3
 */

// Adição
function addition(a, b) {
  return a + b;
}

// Subtração
function subtraction(a, b) {
  return a - b;
}

// Multiplicação
function multiplication(a, b) {
  return a * b;
}

// Divisão (lança erro se o divisor for zero)
function division(a, b) {
  if (b === 0) {
    throw new Error('Erro: divisão por zero não é permitida.');
  }
  return a / b;
}

// Módulo (lança erro se o divisor for zero)
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Erro: módulo por zero não é permitido.');
  }
  return a % b;
}

// Exponenciação
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Raiz quadrada (lança erro para números negativos)
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Erro: não é possível calcular a raiz quadrada de um número negativo.');
  }
  return Math.sqrt(n);
}

const operations = {
  add: addition,
  subtract: subtraction,
  multiply: multiplication,
  divide: division,
  modulo,
  power,
  sqrt: squareRoot,
};
const unaryOperations = new Set(['sqrt']);

function main(args) {
  const [op, rawA, rawB] = args;

  const unary = unaryOperations.has(op);

  if (!op || rawA === undefined || (!unary && rawB === undefined)) {
    console.error('Uso: node src/calculator.js <add|subtract|multiply|divide|modulo|power> <n1> <n2> | sqrt <n>');
    process.exit(1);
  }

  const fn = operations[op];
  if (!fn) {
    console.error(`Operação inválida: "${op}". Use add, subtract, multiply, divide, modulo, power ou sqrt.`);
    process.exit(1);
  }

  const a = Number(rawA);
  const b = unary ? 0 : Number(rawB);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Erro: os operandos devem ser números válidos.');
    process.exit(1);
  }

  try {
    console.log(fn(a, b));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { addition, subtraction, multiplication, division, modulo, power, squareRoot };
