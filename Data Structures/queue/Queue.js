// TODO: Put your code here (don't forget to export it!)
let LinkedList = require('../linked-list/LinkedList.js');

class Queue {
    constructor() {
        this.linkedList = new LinkedList();
    }

    enqueue(value) {
        this.linkedList.append(value);
    }

    dequeue() {
        if (this.linkedList.size() === 0) {
            return null;
        }

        return this.linkedList.removeFirst();
    }

    peek() {
        if (this.linkedList.size() === 0) {
            return null;
        }

        return this.linkedList.get(0);
    }

    size() {
        return this.linkedList.size();
    }

    isEmpty() {
        return this.linkedList.size() === 0;
    }
}

module.exports = Queue;