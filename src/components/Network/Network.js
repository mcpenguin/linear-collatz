import { Component } from 'react';
import Graph from 'react-graph-vis';
import make_color from './color-helper';
import './Network.css';

// make node object with value num
function makeNode(num, noOfNodes) {
    return {
        id: num,
        label: `${num}`,
        size: 10,
        shape: "dot",
        font: {
            face: "Arial",
            align: "center"
        },
        color: make_color(.2, 0.6, 0.99)
    }
}

// make edge object between two numbers
function makeEdge(num1, num2) {
    return {
        id: `${num1}_${num2}`,
        from: num1,
        to: num2,
        arrows: 'to',
        color: "#cccccc"
    }
}

// get union of two arrays
function union(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
}

export default class Network extends Component {

    options = {
        layout: {
            hierarchical: {
                enabled: true,
                sortMethod: 'directed',
                shakeTowards: 'roots',
                direction: 'UD',
                nodeSpacing: 30,
                levelSeparation: 100,
            },
        },
        nodes: {
            font: {
                multi: 'html',
            },
        },
        physics: {
            enabled: true,
            minVelocity: 0.05,
            maxVelocity: 30,
            hierarchicalRepulsion: {
                centralGravity: 1,
                nodeDistance: 70,
            },
        },
    }

    events = {

    }

    componentDidMount() {
        console.log(this.buildTree(10));
    }

    // get "destination" of number; ie get the value to which
    // the number maps to under rules
    getDestination(num) {
        // "pair" of a and b that corresponds to num
        const pair = this.props.rules[num % this.props.k];
        return pair.a * num + pair.b;
    }

    // returns the list of nodes needed for a "closed" graph
    buildTree() {
        // currentList = [1, 2, ..., startNo]
        var currentList = new Set(Array.from(
            { length: this.props.numberOfNodes },
            (v, i) => i + 1
        ));
        console.log(currentList);
        // initialize result set
        var result = new Set();
        // while current list is not empty (ie graph is still "open")
        while (currentList.size !== 0) {
            // choose a "trailing" element from the currenet list
            var num = [...currentList][0];
            // get its destination according to the rules
            var dest = this.getDestination(num);
            // if destination is already in the result, then we know this
            // node "links" up to the graph, and so we can remove it from the
            // current list
            if (dest === 1 || result.has(dest)) {
                currentList.delete(num);
            }
            // otherwise, we need to add the new destination to our graph
            else {
                currentList.add(dest);
                result.add(dest);
            }
            console.log(currentList);
        }

        // return list of nodes as an array
        return [...result];
    }

    makeGraph() {
        const nodeList = this.buildTree(this.props.numberOfNodes);
        return {
            // nodes: Array.from(
            //     { length: this.props.numberOfNodes },
            //     (v, i) => makeNode(i + 1, this.props.numberOfNodes)
            // ),
            // edges: Array.from(
            //     { length: this.props.numberOfNodes },
            //     (v, i) => makeEdge(i + 2, this.getDestination(i + 2))
            // ),
            nodes: [1, ...nodeList].map(makeNode),
            edges: nodeList.map((i) => makeEdge(i, this.getDestination(i)))
        }
    }

    render() {
        return (
            <Graph
                graph={this.makeGraph()}
                options={this.options}
                events={this.events}
                getNetwork={network => this.setState({ network })}
            />
        )
    }
}