import { describe, expect, test } from 'vitest';
import { add, div, mul, sub } from './math.helper';

describe('Math Helper Functions', () => {
    test('add function should return the sum of two numbers', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-1, 1)).toBe(0);
        expect(add(0, 0)).toBe(0);
    });

    test('sub function should return the difference of two numbers', () => {
        expect(sub(5, 3)).toBe(2);
        expect(sub(0, 1)).toBe(-1);
        expect(sub(-1, -1)).toBe(0);
    });

    test('mul function should return the product of two numbers', () => {
        expect(mul(2, 3)).toBe(6);
        expect(mul(-1, 1)).toBe(-1);
        expect(mul(0, 5)).toBe(0);
    });

    test('div function should return the quotient of two numbers', () => {
        expect(div(6, 3)).toBe(2);
        expect(div(-4, 2)).toBe(-2);
        expect(div(5, 2)).toBe(2.5);
    });
});