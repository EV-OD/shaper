import { create, all } from 'mathjs';

// Create a math.js instance
const math = create(all);

// Add custom constants after creating the math instance
math.import({
  PI: Math.PI,
  E: Math.E,
  LN2: Math.LN2,
  LN10: Math.LN10,
  LOG2E: Math.LOG2E,
  LOG10E: Math.LOG10E,
  SQRT2: Math.SQRT2,
  SQRT1_2: Math.SQRT1_2,
  // Add any other constants you want to include
}, { override: true });

export function ev(expression: string | number, invalidReturnValue: any): number | any {
  // Check if the expression is already a number
  if (typeof expression === 'number') {
    return expression; // Directly return the number if it's already a valid number
  }

  try {
    // Use math.js to evaluate the expression safely
    const result = math.evaluate(expression);

    // If the result is a valid number, return it; otherwise, return the invalidReturnValue
    if (typeof result === 'number' && !isNaN(result)) {
      return result;
    } else {
      return invalidReturnValue;
    }
  } catch (error) {
    // If there is any error (like a syntax error), return the invalidReturnValue
    return invalidReturnValue;
  }
}


export function evn(expression: string | number): number {
  return ev(expression, 0); // Return 0 if the expression is invalid
}

