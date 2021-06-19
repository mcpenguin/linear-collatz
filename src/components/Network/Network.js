import { Component } from 'react';
import Graph from 'react-graph-vis';
import './Network.css';

// make node object with value num
function makeNode(num) {
    return {
        id: num,
        label: `${num}`,
        size: 10,
        shape: "dot",
        font: {
            face: "Arial",
            align: "center"
        }
    }
}

// make edge object between two numbers
function makeEdge(num1, num2) {
    return {
        id: `${num1}_${num2}`,
        from: num1,
        to: num2,
        arrows: 'to',
        color: "inherit"
    }
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

    // get "destination" of number; ie get the value to which
    // the number maps to under rules
    getDestination(num) {
        // "pair" of a and b that corresponds to num
        const pair = this.props.rules[num % this.props.k];
        return pair.a * num + pair.b;
    }

    makeGraph() {
        return {
            nodes: Array.from(
                { length: this.props.numberOfNodes },
                (v, i) => makeNode(i+1)
            ),
            edges: Array.from(
                { length: this.props.numberOfNodes },
                (v, i) => makeEdge(i+2, this.getDestination(i+2))
            ),
        }
    }

    render() {
        return (
            <Graph
                graph={this.makeGraph()}
                options={this.options}
                events={this.events}
                getNetwork={network => this.setState({network})}
            />
        )
    }
}