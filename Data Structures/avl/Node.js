// TODO: Implement AVL Tree Node
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = null;
    }
    
    /*
	leftHeight(), rightHeight(), rotateRight(),
	and rotateLeft() are from the following source code
	by Tyriar on Github: https://github.com/gwtw/js-avl-tree/blob/master/src/node.js
	*/
    leftHeight() {
        if (this.left === null) {
            return 0;
        }
        return this.left.height;
    }

    rightHeight() {
        if (this.right === null) {
            return 0;
        }
        return this.right.height;
    }

    rotateRight() {
        let leftNode = this.left;
        this.left = leftNode.right;
        leftNode.right = this;
        this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
        leftNode.height = Math.max(leftNode.leftHeight(), this.height) + 1;
        return leftNode;
    }

    rotateLeft() {
        let rightNode = this.right;
        this.right = rightNode.left;
        rightNode.left = this;
        this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
        rightNode.height = Math.max(this.height, rightNode.rightHeight()) + 1;
        return rightNode;
    }
}

module.exports = Node;
