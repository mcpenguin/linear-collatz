import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Network from './Network/Network';

export default class App extends Component {

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
                k={2}
                numberOfNodes={20}
                rules={[
                  { a: 0.5, b: 0 },
                  { a: 3, b: 1 }
                ]}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            
          </Col>
        </Row>
      </Container>

    )
  }
}
