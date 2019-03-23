// TODO: Implement AVL Tree
const BTree = require('../btree/BinaryTree.js');
const Node = require('./Node.js');
const Stack = require('../stack/Stack.js');

class AVLTree {
    constructor() {
        this.btree = new BTree();
        this.root = null;
        this.root2 = null;
    }

    insert(value) {
        let node = new Node(value);
        let traveler = this.root;
        let stack = new Stack();

        if (this.root === null) {
            this.root = node;
            this.root2 = node;
            node.height = 1;
            return true;
        } else {
            while (true) {
                if (value === traveler.value) {
                    return false;
                } else {
                    if (value < traveler.value) {
                        if (traveler.left === null) {

                            traveler.left = node;
                            node.height = 1;
                            traveler.height = Math.max(traveler.leftHeight(), traveler.rightHeight()) + 1;

                            while (stack.size() != 0) {
                                traveler = stack.peek();

                                traveler.height = Math.max(traveler.leftHeight(), traveler.rightHeight()) + 1;
                                if (traveler.leftHeight() - traveler.rightHeight() >= 2) {
                                    // LL imbalance
                                    if (stack.size() >= 2) {
                                        this.root2 = traveler.rotateRight();
                                        this.root.left = this.root2;
                                    } else {
                                        if (this.root2.rightHeight() >= 2) {
                                            // LR imbalance
                                            this.root.left = traveler.left.rotateLeft();
                                            this.root = traveler.rotateRight();
                                        } else {
                                            this.root = traveler.rotateRight();
                                        }
                                    }
                                } else if (traveler.leftHeight() - traveler.rightHeight() <= -2) {
                                    // RL imbalance
                                    if (stack.size() >= 2) {
                                        this.root2.right = traveler.right.rotateRight();
                                        this.root2 = traveler.rotateLeft();
                                        this.root.right = this.root2;
                                    } else {
                                        this.root.right = traveler.right.rotateRight();
                                        this.root = traveler.rotateLeft();
                                    }
                                }

                                stack.pop();
                            }
                            return true;
                        } else {
                            stack.push(traveler);
                            this.root2 = traveler;
                            traveler = traveler.left;
                        }
                    } else if (value > traveler.value) {
                        if (traveler.right === null) {
                            traveler.right = node;
                            node.height = 1;
                            traveler.height = Math.max(traveler.leftHeight(), traveler.rightHeight()) + 1;

                            while (stack.size() != 0) {
                                traveler = stack.peek();

                                traveler.height = Math.max(traveler.leftHeight(), traveler.rightHeight()) + 1;
                                if (traveler.leftHeight() - traveler.rightHeight() >= 2) {
                                    // LR imbalance
                                    if (stack.size() >= 2) {
                                        this.root2.left = traveler.left.rotateLeft();
                                        this.root2 = traveler.rotateRight();
                                        this.root.left = this.root2;
                                    } else {
                                        this.root.left = traveler.left.rotateLeft();
                                        this.root = traveler.rotateRight();
                                    }
                                } else if (traveler.leftHeight() - traveler.rightHeight() <= -2) {
                                    // RR imbalance
                                    if (stack.size() >= 2) {
                                        this.root2 = traveler.rotateLeft();
                                        this.root.right = this.root2;
                                    } else {
                                        if (this.root2.leftHeight() >= 2) {
                                            // LR imbalance
                                            this.root.right = traveler.right.rotateRight();
                                            this.root = traveler.rotateLeft();
                                        } else {
                                            this.root = traveler.rotateLeft();
                                        }
                                    }
                                }

                                stack.pop();
                            }
                            return true;
                        } else {
                            stack.push(traveler);
                            this.root2 = traveler;
                            traveler = traveler.right;
                        }
                    }
                }
            }
        }
    }

    printBreadthFirst() {
        return this.btree.printBreadthFirst();
    }

    printDepthFirst() {
        return this.btree.printDepthFirst();
    }
}

module.exports = AVLTree