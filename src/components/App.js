import { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Network from './Network/Network';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfNodes: 15,
      numberOfRules: 2,
      rules: [
        { a: 1 / 2, b: 0 },
        { a: 3, b: 1 },
      ],
      maxBound: 10 ** 10,
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
              If the graph becomes messed up, you can press <br />
              the "Rerender Network" button.
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
                maxBound={this.state.maxBound}
                isHierarchical={this.state.isHierarchical}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="Number of Nodes">
                <Form.Label>Test numbers up to: </Form.Label>
                <Form.Control onChange={
                  (result) => {
                    try {
                      this.setState(({ numberOfNodes, ...rest }) => {
                        return {
                          numberOfNodes: parseInt(result.target.value),
                          ...rest
                        }
                      })
                    } catch (e) { }
                  }
                } />
              </Form.Group>
              <Form.Group>
                <Form.Label>Max Bound: </Form.Label>
                <Form.Control
                  defaultValue={10 ** 10}
                  onChange={
                    (result) => {
                      try {
                        this.setState(({ maxBound, ...rest }) => {
                          return {
                            maxBound: parseInt(result.target.value),
                            ...rest
                          }
                        })
                      } catch (e) { }
                    }
                  } />
              </Form.Group>
              <Form.Group>
                <Form.Label>View as Hierarchical Layout: (not recommended for cycles): </Form.Label>
                <Form.Check
                  onClick={
                    (result) => {
                      this.setState(({ isHierarchical, ...rest }) => {
                        return {
                          isHierarchical: !isHierarchical,
                          ...rest
                        }
                      })
                    }
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of rules: </Form.Label>
                <Form.Control
                  defaultValue={2}
                  onChange={
                    (result) => {
                      try {
                        const noOfRules = parseInt(result.target.value);
                        if (noOfRules === 1) throw new Error();
                        this.setState(({ numberOfRules, rules, ...rest }) => {
                          return {
                            numberOfRules: noOfRules,
                            rules: Array.from({ length: noOfRules }, (_, i) => {
                              return i === 0
                                ? { a: 1 / noOfRules, b: 0 }
                                : { a: 1, b: -i };
                            }),
                            ...rest
                          }
                        })
                      } catch (e) { }
                    }
                  } />
              </Form.Group>
              <Form.Group>
                <Form.Label>Rule 0: </Form.Label>
                <Form.Label className="rules">a: </Form.Label>
                <Form.Control
                  className="rules"
                  readOnly
                  plaintext
                  value={1 / this.state.numberOfRules}
                />
                <Form.Label className="rules">b: </Form.Label>
                <Form.Control
                  className="rules"
                  readOnly
                  plaintext
                  value={0}
                />
              </Form.Group>
              {
                Array.from({ length: this.state.numberOfRules - 1 }, (_, i) => {
                  return (
                    <Form.Group>
                      <Form.Label>Rule {i + 1}: </Form.Label>
                      <Form.Label className="rules">a: </Form.Label>
                      <Form.Control
                        className="rules"
                        onChange={
                          (result) => {
                            try {
                              const val = parseInt(result.target.value);
                              this.setState(({ rules, ...rest }) => {
                                let newRules = rules;
                                newRules[i + 1].a = val;
                                return {
                                  rules: newRules,
                                  ...rest
                                }
                              })
                            } catch (e) { }
                          }
                        }
                      />
                      <Form.Label className="rules">b: </Form.Label>
                      <Form.Control
                        className="rules"
                        onChange={
                          (result) => {
                            try {
                              const val = parseInt(result.target.value);
                              this.setState(({ rules, ...rest }) => {
                                let newRules = rules;
                                newRules[i + 1].b = val;
                                return {
                                  rules: newRules,
                                  ...rest
                                }
                              })
                            } catch (e) { }
                          }
                        }
                      />
                    </Form.Group>
                  )
                })
              }
              <Form.Group>
                <Button
                  variant="primary"
                  onClick={
                    () => {
                      try {
                        this.setState(({ numberOfNodes, ...rest }) => {
                          return {
                            numberOfNodes: parseInt(numberOfNodes),
                            ...rest
                          }
                        })
                      } catch (e) { }
                    }
                  }
                >Rerender Network</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

    )
  }
}
