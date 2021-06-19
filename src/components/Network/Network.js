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
        color: make_color((num-1)/noOfNodes, 0.6, 0.99)
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

export default class Network extends Component {

    options = {
        layout: {
            // hierarchical: {
            //     enabled: true,
            //     sortMethod: 'directed',
            //     shakeTowards: 'roots',
            //     direction: 'UD',
            //     nodeSpacing: 30,
            //     levelSeparation: 200,
            // },
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
                (v, i) => makeNode(i+1, this.props.numberOfNodes)
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