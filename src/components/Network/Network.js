import { Component } from 'react';
import Graph from 'react-graph-vis';
import './Network.css';

// make node object with value num
function makeNode(num) {
    return {
        id: num,
        label: num
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
                direction: 'DU',
                nodeSpacing: 150,
                levelSeparation: 280,
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
            },
        },
    }

    events = {

    }

    constructor(props) {
        super(props);
        this.state = {
            numberOfNodes: 10,
            rules: {

            }
        }
    }

    makeGraph() {
        return {
            nodes: Array.from(
                { length: this.state.numberOfNodes },
                (v, i) => makeNode(i)
            ),
            edges: [
                makeEdge(1,2)
            ]
        }
    }

    render() {
        return (
            <Graph
                graph={this.makeGraph()}
                options={this.options}
                events={this.events}
            />
        )
    }
}