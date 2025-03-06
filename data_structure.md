# Data Structure 

---
<!-- feature 1 -->
## Node Editor
### Hybrid Data Structures

#### ***GraphList (Mix of Linked List and Graph)***

GraphList is a custom data structure that combines features of both a graph and a linked list. It is designed to efficiently handle node-based computations while maintaining flexible connections between nodes. Each node can have multiple inputs and outputs, and edges define explicit relationships between nodes.

#### Components:

- **Node:** Contains data, input vertices, and output vertices.
- **Vertex:** Represents connection points within nodes.
- **Edge:** Defines relationships between nodes by connecting specific vertices.
- **GraphList:** Manages nodes and edges, allowing efficient traversal and updates.


#### **Bidirectional Data Flow:**

The core feature of the GraphList is its ability to handle bidirectional data flow. This means that while the main working flow of data is unidirectional (moving in one direction), data can flow both ways between nodes, making the structure dynamic.

---
#### Example

For instance:
- **VertexPositionInstance node** takes a vector node as input.
- A **Random node** is created, then clamped and multiplied with another vector.
- This modified value is passed to a **Transform node** for further computation.

Due to the bidirectional flow:
- Each vertex can generate a unique random value.
- Calculations like clamp and multiply are applied dynamically for each vertex, ensuring unique outputs for each instance.

This approach avoids static values, ensuring that calculations adjust with each vertex, creating dynamic results rather than constant ones. Furthermore, any node can access data from instance nodes through backward data flow, allowing the system to remain flexible and responsive to changes at any point in the graph.

---

<!-- feature 2 -->
## Evaluation of Expression

### Stack
The **Stack** is a fundamental data structure used in the expression evaluation process. It follows the **Last In, First Out (LIFO)** principle, meaning the last element added is the first to be removed.

- **Operator Management:** The stack is used to hold operators temporarily while parsing the expression. The operators are pushed onto the stack and popped based on their precedence.
- **Expression Parsing:** It allows for the proper handling of operator precedence and parentheses. When an operator with higher precedence is encountered, it is pushed onto the stack. Operators with lower precedence cause the stack to be popped, ensuring the correct order of operations.

In this case, the stack is instrumental in managing the flow of operators and operands during the parsing of the mathematical expression.

### Queue
A **Queue** is another data structure used in certain evaluation processes. A queue follows the **First In, First Out (FIFO)** principle, meaning the first element added is the first to be removed.

- **Operands Handling:** While stacks are used for operators, queues can be used to manage the order of operands. When a number or operand is encountered in the expression, it is added to the queue.
- **Expression Evaluation:** The queue helps manage the order in which operands are processed in relation to operators. Once the operators have been applied, the queue holds the operands in the correct order for evaluation.

Though not used directly in the algorithm, a queue can be useful for processing operands in an expression in certain types of evaluation algorithms.


### Expression Tree and Algorithm

#### ***Expression Tree***

The Expression Tree is a custom data structure used to evaluate mathematical expressions. The expression is parsed into a binary tree, where each **leaf node** holds operands (numbers), and **internal nodes** represent operators (e.g., `+`, `-`, `*`, `/`). This tree structure helps respect operator precedence and ensures correct evaluation order.

#### Components:

- **TreeNode:** Represents each node in the expression tree, containing a value (number or operator), and pointers to left and right child nodes.
- **Stack:** Used for managing operators and operands during the tree-building process. The **operators stack** ensures precedence and operator order, while the **operands stack** stores **TreeNode** objects.
- **ExpressionTree:** Manages the tree-building and evaluation processes.

#### **Shunting Yard Algorithm:**

- Converts the infix expression (e.g., `3 + 5`) to postfix (Reverse Polish Notation, RPN) using a stack.
- The algorithm respects operator precedence and parentheses, ensuring operators are applied in the correct order.

#### **Post-order Evaluation:**

- The tree is evaluated using a **post-order traversal** approach, where each operator is applied after its operands have been evaluated, ensuring correct operation order.

---
#### Example

For instance, consider the expression: `3 + 5 * (2 - 8)`

- The expression is parsed into a tree, where each operator (`+`, `*`, `-`) forms internal nodes and operands (`3`, `5`, `2`, `8`) form leaf nodes.
- The tree is evaluated in a post-order manner:
  - First, the sub-expression `(2 - 8)` is evaluated, yielding `-6`.
  - Then `5 * (-6)` is evaluated, yielding `-30`.
  - Finally, `3 + (-30)` is evaluated, resulting in `-27`.

This approach allows the correct evaluation of complex expressions by considering operator precedence and ensuring accurate computation.

---
### Key Points:
- **Expression Tree:** Organizes operands and operators in a binary tree, ensuring correct precedence and evaluation order.
- **Stack-based Parsing:** Uses a stack to handle operators and operands during parsing, allowing dynamic expression construction.
- **Bidirectional Flow:** The Expression Tree ensures efficient traversal and evaluation by dynamically processing each sub-expression.

This method ensures that mathematical expressions are evaluated correctly and efficiently, handling complex operations like parentheses and operator precedence.
