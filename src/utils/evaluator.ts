import { create, all } from 'mathjs';

const math = create(all);

math.import({
  PI: Math.PI,
  E: Math.E,
  LN2: Math.LN2,
  LN10: Math.LN10,
  LOG2E: Math.LOG2E,
  LOG10E: Math.LOG10E,
  SQRT2: Math.SQRT2,
  SQRT1_2: Math.SQRT1_2,
}, { override: true });

export function ev(expression: string | number, invalidReturnValue: any): number | any {
  if (typeof expression === 'number') {
    return expression;
  }

  try {
    const result = math.evaluate(expression);
    return (typeof result === 'number' && !isNaN(result)) ? result : invalidReturnValue;
  } catch (error) {
    return invalidReturnValue;
  }
}

export function evn(expression: string | number): number {
  return ev(expression, 0);
}
