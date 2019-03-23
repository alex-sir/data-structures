const Node = require("./Node.js");
const Edge = require("./Edge.js");
const PQueue = require("../heap/PriorityQueue.js");


class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(value) {
        if (this.nodes.has(value)) {
            return false;
        }
        const node = new Node(value);
        this.nodes.set(node.value, node.edges);
        return true;
    }

    removeNode(value) {
        if (this.nodes.has(value)) {
            this.nodes.delete(value);
            return true;
        }
        return false;
    }

    connectNodes(value1, value2, cost) {
        if (!this.nodes.has(value1) ||
            !this.nodes.has(value2) ||
            this.nodes.get(value1).has(value2)) {
            return false
        }
        const edge1 = new Edge(value2, cost);
        const edge2 = new Edge(value1, cost);
        this.nodes.get(value1).set(edge1.destination, edge1.cost);
        this.nodes.get(value2).set(edge2.destination, edge2.cost);
        return true;
    }

    disconnectNodes(value1, value2) {
        if (!this.nodes.has(value1) ||
            !this.nodes.has(value2) ||
            !this.nodes.get(value1).has(value2)) {
            return false
        }
        this.nodes.get(value1).delete(value2);
        this.nodes.get(value2).delete(value1);
        return true;
    }

    /*
    dijkstras implementation with priority queue learned in online course
    "JavaScript Algorithms and Data Structures Masterclass"
    by Colt Steele
    https: //www.udemy.com/js-algorithms-and-data-structures-masterclass/
    */
    findShortestPath(value1, value2) {
        const pQueue = new PQueue();
        const distances = {}; //return value2 at end for total distance
        const previous = {};
        let path = []; //path to return at end
        let smallest;
        //build up initial state
        this.nodes.forEach((value, key) => {
            if (key === value1) {
                distances[key] = 0;
                pQueue.enqueue(key, 0);
            } else {
                distances[key] = Infinity;
                pQueue.enqueue(key, Infinity);
            }
            previous[key] = null;
        });
        //keep visiting until value2 is reached
        while (pQueue.values.length) {
            smallest = pQueue.dequeue().val;
            if (smallest === value2) {
                while (previous[smallest]) {
                    //done, set path to get to value2
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                let iterator1 = this.nodes.get(smallest).entries();
                this.nodes.get(smallest).forEach(() => {
                    //find neighboring node
                    let nextNode = iterator1.next().value;
                    //calculate new distances to neighboring node
                    let candidate = distances[smallest] + nextNode[1];
                    let nextNeighbor = nextNode[0];
                    if (candidate < distances[nextNeighbor]) {
                        //updating new smallest distance at neighbor
                        distances[nextNeighbor] = candidate;
                        //updating previous - How neighbor was reached
                        previous[nextNeighbor] = smallest;
                        //enqueue in pQueue with new priority
                        pQueue.enqueue(nextNeighbor, candidate);
                    }
                })
            }
        }
        return {
            cost: distances[value2],
            path: path.concat(smallest).reverse()
        }
    }

}

module.exports = Graph;