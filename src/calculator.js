#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Operações suportadas:
 *   - add (adição, +)
 *   - subtract (subtração, -)
 *   - multiply (multiplicação, *)
 *   - divide (divisão, /) — divisão por zero retorna erro claro
 *   - modulo (resto da divisão, %)
 *   - power (potenciação)
 *   - sqrt (raiz quadrada)
 *
 * Uso: node src/calculator.js <operação> <número1> [número2]
 * O segundo número é necessário, exceto para sqrt.
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

// Resto da divisão
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Erro: módulo por zero não é permitido.');
  }
  const result = a % b;
  if (Number.isNaN(result)) {
    throw new Error('Erro: módulo inválido.');
  }
  return result;
}

// Potenciação
function power(base, exponent) {
  if (base === 0 && exponent < 0) {
    throw new Error('Erro: zero não pode ser elevado a um expoente negativo.');
  }
  const result = base ** exponent;
  if (Number.isNaN(result)) {
    throw new Error('Erro: potenciação sem resultado real.');
  }
  return result;
}

// Raiz quadrada
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Erro: raiz quadrada de número negativo não é permitida.');
  }
  return Math.sqrt(n);
}

const operations = { add: addition, subtract: subtraction, multiply: multiplication, divide: division, modulo, power, sqrt: squareRoot };

function main(args) {
  const [op, rawA, rawB] = args;

  if (!op || rawA === undefined || (op !== 'sqrt' && rawB === undefined)) {
    console.error('Uso: node src/calculator.js <add|subtract|multiply|divide|modulo|power|sqrt> <n1> [n2]');
    process.exit(1);
  }

  const fn = operations[op];
  if (!fn) {
    console.error(`Operação inválida: "${op}". Use add, subtract, multiply, divide, modulo, power ou sqrt.`);
    process.exit(1);
  }

  const a = Number(rawA);
  const b = rawB === undefined ? undefined : Number(rawB);
  if (Number.isNaN(a) || (rawB !== undefined && Number.isNaN(b))) {
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
