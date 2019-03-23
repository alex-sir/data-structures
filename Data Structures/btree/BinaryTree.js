// TODO: Implement BinaryTree
let Queue = require('../queue/Queue.js');
let Stack = require('../stack/Stack.js');
let Node = require('./Node.js');

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        let node = new Node(value);
        let traveler = this.root;

        if (this.root === null) {
            this.root = node;
            return true;
        } else {
            while (true) {
                if (value === traveler.value) {
                    return false;
                } else {
                    if (value < traveler.value) {
                        if (traveler.left === null) {
                            traveler.left = node;
                            return true;
                        } else {
                            traveler = traveler.left;
                        }
                    } else if (value > traveler.value) {
                        if (traveler.right === null) {
                            traveler.right = node;
                            return true;
                        } else {
                            traveler = traveler.right;
                        }
                    }
                }
            }
        }
    }


    contains(value) {
        let traveler = this.root;

        if (this.root === null) {
            return false;
        } else {
            while (true) {
                if (value === traveler.value) {
                    return true;
                } else if (value < traveler.value) {
                    traveler = traveler.left;
                } else if (value > traveler.value) {
                    traveler = traveler.right;
                }
                if (traveler === null) {
                    return false;
                }
            }
        }
    }

    printBreadthFirst() {
        let queue = new Queue();
        let node = this.root;

        if (!node) {
            return false;
        }

        queue.enqueue(node);

        while (!queue.isEmpty()) {
            console.log(queue.dequeue().value);

            if (node.left) {
                queue.enqueue(node.left);
            }

            if (node.right) {
                queue.enqueue(node.right);
            }
            node = queue.peek();
        }
    }

    printDepthFirst() {
        let stack = new Stack();
        let node = this.root;

        if (!node) {
            return false;
        }

        function traverse(node) {
            stack.push(node);
            console.log(stack.pop().value);

            if (node.left) {
                traverse(node.left);
            }
            if (node.right) {
                traverse(node.right);
            }
        }

        traverse(node);
    }
}

module.exports = BinarySearchTree;