class Stack {
  constructor() {
    this.items = [];
    this.top = null;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  getTop() {
    return this.top;
  }
  size() {
    return this.items.length;
  }
  push(element) {
    this.items.push(element);
    this.top = element;
  }
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    if (this.size() === 1) {
      this.top = null;
      return this.items.pop();
    }
    this.top = this.items[this.items.length - 2];
    return this.items.pop();
  }
}
class Queue {
  constructor() {
    this.items = [];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  getFront() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }
}

function findBin(number) {
  let result = [];
  let queue = new Queue();
  queue.enqueue(1);
  for (var i = 0; i < number; i++) {
    let temp = queue.dequeue();
    var s1 = temp + "0";
    var s2 = temp + "1";
    result.push(temp);
    queue.enqueue(s1);
    queue.enqueue(s2);
  }
  return result;
}

console.log(findBin(10));

class TwoStacks {
  constructor(size) {
    this.items = [];
    this.size = size;
    this.top1 = -1;
    this.top2 = size;
  }
  push1(value) {
    if (this.top1 < this.top2 - 1) {
      this.top1++;
      this.items[this.top1] = value;
    }
  }
  push2(value) {
    if (this.top1 < this.top2 - 1) {
      this.top2--;
      this.items[this.top2] = value;
    }
  }
  pop1() {
    if (this.top1 > 0) {
      let val = this.items[this.top1];
      this.top1--;
      return val;
    } else {
      return -1;
    }
  }
  pop2() {
    if (this.top2 < this.size) {
      let val = this.items[this.top2];
      this.top2++;
      return val;
    }
  }
}
function reverseK(q, k) {
  let tempStack = new Stack();
  let count = 0;
  while (count < k) {
    tempStack.push(q.dequeue());
    count++;
  }
  while (tempStack.isEmpty() === false) {
    q.enqueue(tempStack.pop());
  }
  for (var i = 0; i < q.size() - k; i++) {
    q.enqueue(q.dequeue());
  }
  return q;
}

let queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
console.log(reverseK(queue, 3));

class NewQueue {
  constructor() {
    this.mainStack = new Stack();
    this.tempStack = new Stack();
  }
  enqueue(value) {
    this.mainStack.push(value);
  }
  dequeue() {
    if (this.tempStack.isEmpty() && this.mainStack.isEmpty()) {
      return null;
    } else if (this.tempStack.isEmpty()) {
      while (this.mainStack.isEmpty() === false) {
        this.tempStack.push(this.mainStack.pop());
      }
      return this.tempStack.pop();
    }
    return this.tempStack.pop();
  }
}

let nq = new NewQueue();
nq.enqueue(1);
nq.enqueue(2);
nq.enqueue(3);
console.log(nq);
console.log(nq.dequeue());
console.log(nq);
console.log(nq.dequeue());

function sortedStack(mainStack) {
  let tempStack = new Stack();
  let value;
  while (mainStack.isEmpty() === false) {
    value = mainStack.pop();
    if (value > tempStack.getTop()) {
      tempStack.push(value);
    } else {
      while (tempStack.isEmpty() === false) {
        mainStack.push(tempStack.pop());
      }
      tempStack.push(value);
    }
  }
  while (tempStack.isEmpty() === false) {
    mainStack.push(tempStack.pop());
  }
  return mainStack;
}
var stack = new Stack();
stack.push(2);
stack.push(97);
stack.push(4);
stack.push(42);
stack.push(12);
stack.push(60);
stack.push(23);
console.log(sortedStack(stack));

function evaluatePostfix(expression) {
  let stack = new Stack();
  for (var i = 0; i < expression.length; i++) {
    let num = Number.parseInt(expression[i], 10);
    if (!isNaN(num)) {
      stack.push(num);
    } else {
      let operator = expression[i];
      let op1 = stack.pop();
      let op2 = stack.pop();
      if (operator === "+") {
        stack.push(op1 + op2);
      }
      if (operator === "-") {
        stack.push(op2 - op1);
      }
      if (operator === "*") {
        stack.push(op2 * op1);
      }
      if (operator === "/") {
        stack.push(op2 / op1);
      }
    }
  }
  return stack.pop();
}
console.log("Result: " + evaluatePostfix("921*-8-4+"));

function isBalanced(exp) {
  let stack = new Stack();
  for (var i = 0; i < exp.length; i++) {
    if (exp[i] === "}" || exp[i] === "]" || exp[i] === ")") {
      if (stack.isEmpty()) {
        return false;
      }
      let output = stack.pop();
      if (
        (exp[i] === "}" && output !== "{") ||
        (exp[i] === ")" && output !== "(") ||
        (exp[i] === "]" && output !== "[")
      ) {
        return false;
      }
    } else {
      stack.push(exp[i]);
    }
  }
  if (stack.isEmpty() === false) {
    return false;
  }
  return true;
}
var inputString = "{[()]}";
console.log(inputString);
console.log(isBalanced(inputString));

inputString = "{[([({))]}}";
console.log(inputString);
console.log(isBalanced(inputString));

class minStack {
  constructor() {
    this.mainStack = new Stack();
    this.tempStack = new Stack();
  }
  pop() {
    let value = this.mainStack.pop();
    if (value === this.tempStack.getTop()) {
      this.tempStack.pop();
    }
    return value;
  }
  push(value) {
    this.mainStack.push(value);
    if (this.tempStack.isEmpty() === false) {
      if (
        value < this.tempStack.getTop() &&
        this.tempStack.isEmpty() === false
      ) {
        this.tempStack.push(value);
      }
    } else {
      this.tempStack.push(value);
    }
  }
  min() {
    return this.tempStack.getTop();
  }
}
var s = new minStack();
s.push(5);
s.push(2);
s.push(4);
s.push(1);
s.push(3);
s.push(9);

console.log("minimum value: ", s.min());

s.pop();
s.pop();
s.pop();

console.log("minimum value: ", s.min());
