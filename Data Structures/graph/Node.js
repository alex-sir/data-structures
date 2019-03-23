class Node {
    constructor(value) {
        this.value = value;
        this.edges = new Map();
    }
}

module.exports = Node;