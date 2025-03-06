class TreeNode {
    value: number | string;
    left: TreeNode | null;
    right: TreeNode | null;
  
    constructor(value: number | string) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  class ExpressionTree {
    root: TreeNode | null;
  
    constructor() {
      this.root = null;
    }
  
    build(expression: string): void {
      const tokens = expression.match(/\d+|[-+*/()]/g);
      if (!tokens) return;
      
      const operators = new Stack<string>();
      const operands = new Stack<TreeNode>();
      
      for (let token of tokens) {
        if (!isNaN(Number(token))) {
          operands.push(new TreeNode(parseFloat(token)));
        } else if (token === '(') {
          operators.push(token);
        } else if (token === ')') {
          while (!operators.isEmpty() && operators.peek() !== '(') {
            this.processOperator(operators, operands);
          }
          operators.pop();
        } else {
          while (!operators.isEmpty() && this.precedence(token) <= this.precedence(operators.peek()!)) {
            this.processOperator(operators, operands);
          }
          operators.push(token);
        }
      }
      
      while (!operators.isEmpty()) {
        this.processOperator(operators, operands);
      }
      
      this.root = operands.pop() || null;
    }
  
    private processOperator(operators: Stack<string>, operands: Stack<TreeNode>): void {
      const operator = operators.pop()!;
      const right = operands.pop()!;
      const left = operands.pop()!;
      const node = new TreeNode(operator);
      node.left = left;
      node.right = right;
      operands.push(node);
    }
  
    private precedence(op: string): number {
      return { '+': 1, '-': 1, '*': 2, '/': 2 }[op] || 0;
    }
  
    evaluate(node: TreeNode | null = this.root): number {
      if (!node) return NaN;
      if (typeof node.value === 'number') return node.value;
      
      const left = this.evaluate(node.left);
      const right = this.evaluate(node.right);
      
      switch (node.value) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return right !== 0 ? left / right : NaN;
        default: return NaN;
      }
    }
  }
  
  class Stack<T> {
    private items: T[] = [];
    push(item: T): void {
      this.items.push(item);
    }
    pop(): T | undefined {
      return this.items.pop();
    }
    peek(): T | undefined {
      return this.items[this.items.length - 1];
    }
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  }
  
  class Queue<T> {
    private items: T[] = [];
    enqueue(item: T): void {
      this.items.push(item);
    }
    dequeue(): T | undefined {
      return this.items.shift();
    }
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  }
  
  class SimpleMath {
    constants = {
      PI: Math.PI,
      E: Math.E,
      LN2: Math.LN2,
      LN10: Math.LN10,
      LOG2E: Math.LOG2E,
      LOG10E: Math.LOG10E,
      SQRT2: Math.SQRT2,
      SQRT1_2: Math.SQRT1_2,
    };
  
    evaluate(expression: string | number): number {
      try {
        if (typeof expression === 'number') {
          return expression;
        }
        
        const tree = new ExpressionTree();
        tree.build(expression);
        return tree.evaluate();
      } catch (error) {
        return NaN;
      }
    }
  }
  
  const create = (): SimpleMath => new SimpleMath();
  const all = new SimpleMath();
  
  export { create, all };
  
  // export function ev(expression: string | number, invalidReturnValue: any): number | any {
  //   if (typeof expression === 'number') {
  //     return expression;
  //   }
  //   try {
  //     const result = all.evaluate(expression);
  //     return (typeof result === 'number' && !isNaN(result)) ? result : invalidReturnValue;
  //   } catch (error) {
  //     return invalidReturnValue;
  //   }
  // }
  
  // export function evn(expression: string | number): number {
  //   return ev(expression, 0);
  // }
  