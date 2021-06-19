import { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Network from './Network/Network';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfNodes: 5,
      rules: [
        { a: 0.5, b: 0 },
        { a: 3, b: 1 }
      ]
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="website-heading">Linear Collatz</h1>
            <h3 className="website-heading">
              Use the settings on the sidebar to configure the graph.
              If the graph becomes messed up, you can just reload the page.
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="network">
              <Network
                k={this.state.rules.length}
                numberOfNodes={this.state.numberOfNodes}
                rules={this.state.rules}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="Number of Nodes">
                <Form.Label>Number of Nodes</Form.Label>
                <Form.Control onChange={
                  (result) => {
                    try {
                      this.setState(({ numberOfNodes }) => {
                        console.log(result.target.value);
                        return {
                          numberOfNodes: parseInt(result.target.value)
                        }
                      })
                    } catch (e) {}
                  }
                } />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

    )
  }
}
