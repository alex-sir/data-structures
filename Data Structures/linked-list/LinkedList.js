let Node = require('./Node.js');

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    print() {
        let traveler = this.head;

        while (traveler) {
            console.log(traveler.value);
            traveler = traveler.next;
            this.size();
        }
    }

    size() {
        return this.length;
    }

    append(value) {
        let newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.length++;
            return;
        }

        let traveler = this.head;

        while (traveler.next) {
            traveler = traveler.next;
        }

        traveler.next = newNode;
        this.length++;
    }

    prepend(value) {
        let newNode = new Node(value);

        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }

    get(index) {
        let count = 0;
        let traveler = this.head;

        if (index < 0 || index > this.size()) {
            throw new Error("index out of bounds");
        }

        while (count < index) {
            traveler = traveler.next;
            count++;
        }
        return traveler.value;
    }

    find(value) {
        let count = 0;
        let traveler = this.head;

        if (!traveler) {
            return -1;
        } else {
            while (traveler.value !== value) {
                traveler = traveler.next;
                if (!traveler) {
                    return -1
                }
                count++;
            }
            return count;
        }
    }

    removeFirst() {
        if (!this.head) {
            return null;
        } else {
            let temp = this.head.value;
            this.head = this.head.next;
            this.length--;
            return temp;
        }
    }

    removeLast() {
        let traveler = this.head;
        let previous = null;

        if (!traveler) {
            return null;
        }

        let temp = this.head.value;

        if (!this.head.next) {
            this.head = this.head.next;
            this.length--;
            return temp;
        } else {
            while (traveler.next) {
                previous = traveler;
                traveler = traveler.next;
            }

            temp = traveler.value;
            previous.next = traveler.next;
            this.length--;
            return temp;
        }
    }

    insertAt(value, index) {
        let newNode = new Node(value);

        if (index < 0) {
            throw new Error("index out of bounds");
        } else if (index === 0) {
            this.prepend(value);
            this.length++;
            return;
        }

        let traveler = this.head;
        let previous = null;
        let count = 0;

        while (count !== index) {
            previous = traveler;
            traveler = traveler.next;
            count++;
        }

        previous.next = newNode;
        newNode.next = traveler;
        this.length++
    }

    removeAt(index) {
        if (index < 0) {
            throw new Error("index out of bounds");
        } else if (index === 0) {
            let temp = this.head.value;
            this.removeFirst();
            return temp;
        }

        let traveler = this.head;
        let previous = null;
        let count = 0;

        while (count !== index) {
            previous = traveler;
            traveler = traveler.next;
            count++;
        }

        let temp = traveler.value;
        previous.next = traveler.next;
        this.length--;
        return temp;
    }

}

module.exports = LinkedList;