const { spawnSync } = require('child_process');
const path = require('path');
const { addition, subtraction, multiplication, division, modulo, power, squareRoot } = require('../calculator');

const CLI = path.join(__dirname, '..', 'calculator.js');
const run = (...args) => spawnSync('node', [CLI, ...args], { encoding: 'utf8' });

describe('addition', () => {
  test('2 + 3 = 5', () => expect(addition(2, 3)).toBe(5));
  test('números negativos', () => expect(addition(-2, -3)).toBe(-5));
  test('positivo + negativo', () => expect(addition(5, -8)).toBe(-3));
  test('zero é elemento neutro', () => expect(addition(7, 0)).toBe(7));
  test('decimais', () => expect(addition(0.5, 0.25)).toBeCloseTo(0.75));
  test('0.1 + 0.2 ≈ 0.3', () => expect(addition(0.1, 0.2)).toBeCloseTo(0.3));
});

describe('subtraction', () => {
  test('10 - 4 = 6', () => expect(subtraction(10, 4)).toBe(6));
  test('resultado negativo', () => expect(subtraction(4, 10)).toBe(-6));
  test('subtrair negativo', () => expect(subtraction(5, -3)).toBe(8));
  test('x - x = 0', () => expect(subtraction(9, 9)).toBe(0));
  test('decimais', () => expect(subtraction(1.5, 0.25)).toBeCloseTo(1.25));
});

describe('multiplication', () => {
  test('45 * 2 = 90', () => expect(multiplication(45, 2)).toBe(90));
  test('multiplicar por zero', () => expect(multiplication(123, 0)).toBe(0));
  test('multiplicar por um', () => expect(multiplication(8, 1)).toBe(8));
  test('negativo * negativo = positivo', () => expect(multiplication(-3, -4)).toBe(12));
  test('negativo * positivo = negativo', () => expect(multiplication(-3, 4)).toBe(-12));
  test('decimais', () => expect(multiplication(0.5, 0.5)).toBeCloseTo(0.25));
});

describe('division', () => {
  test('20 / 5 = 4', () => expect(division(20, 5)).toBe(4));
  test('resultado decimal', () => expect(division(1, 4)).toBe(0.25));
  test('negativo / positivo', () => expect(division(-10, 2)).toBe(-5));
  test('negativo / negativo', () => expect(division(-10, -2)).toBe(5));
  test('zero dividido por número', () => expect(division(0, 5)).toBe(0));
  test('divisão por zero lança erro', () => {
    expect(() => division(5, 0)).toThrow('divisão por zero');
  });
  test('0 / 0 lança erro', () => {
    expect(() => division(0, 0)).toThrow('divisão por zero');
  });
});

describe('modulo', () => {
  test('retorna o resto da divisão', () => expect(modulo(10, 3)).toBe(1));
  test('preserva o sinal do dividendo', () => expect(modulo(-10, 3)).toBe(-1));
  test('aceita decimais', () => expect(modulo(5.5, 2)).toBe(1.5));
  test('divisor zero lança erro', () => expect(() => modulo(0, 0)).toThrow('módulo por zero'));
  test('dividendo infinito lança erro', () => expect(() => modulo(Infinity, 2)).toThrow('módulo inválido'));
});

describe('power', () => {
  test('calcula a potência', () => expect(power(2, 3)).toBe(8));
  test('expoente negativo', () => expect(power(2, -2)).toBe(0.25));
  test('expoente zero', () => expect(power(0, 0)).toBe(1));
  test('base negativa com expoente inteiro', () => expect(power(-2, 3)).toBe(-8));
  test('base negativa com expoente fracionário lança erro', () => {
    expect(() => power(-1, 0.5)).toThrow('sem resultado real');
  });
  test('zero elevado a expoente negativo lança erro', () => {
    expect(() => power(0, -1)).toThrow('expoente negativo');
  });
});

describe('squareRoot', () => {
  test('calcula a raiz quadrada', () => expect(squareRoot(9)).toBe(3));
  test('raiz de zero', () => expect(squareRoot(0)).toBe(0));
  test('raiz não inteira', () => expect(squareRoot(2)).toBeCloseTo(Math.SQRT2));
  test('número negativo lança erro', () => expect(() => squareRoot(-1)).toThrow('número negativo'));
});

describe('CLI', () => {
  test.each([
    [['add', '2', '3'], '5'],
    [['subtract', '10', '4'], '6'],
    [['multiply', '45', '2'], '90'],
    [['divide', '20', '5'], '4'],
    [['modulo', '10', '3'], '1'],
    [['power', '2', '3'], '8'],
    [['sqrt', '9'], '3'],
  ])('%j => %s', (args, expected) => {
    const r = run(...args);
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe(expected);
  });

  test('divisão por zero retorna erro e código 1', () => {
    const r = run('divide', '5', '0');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/divisão por zero/);
  });

  test('operação inválida', () => {
    const r = run('unknown', '2', '3');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/Operação inválida/);
  });

  test('argumentos ausentes', () => {
    const r = run('add', '2');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/Uso:/);
  });

  test('operando não numérico', () => {
    const r = run('add', 'a', '3');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/números válidos/);
  });

  test.each([
    [['modulo', '5', '0'], /módulo por zero/],
    [['modulo', 'Infinity', '2'], /módulo inválido/],
    [['power', '-1', '0.5'], /sem resultado real/],
    [['power', '0', '-1'], /expoente negativo/],
    [['sqrt', '-1'], /número negativo/],
    [['sqrt', 'a'], /números válidos/],
    [['sqrt'], /Uso:/],
    [['power', '2'], /Uso:/],
  ])('%j retorna erro', (args, message) => {
    const r = run(...args);
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(message);
  });
});
