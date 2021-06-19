import { Component } from 'react';
import Network from './Network/Network';

export default class App extends Component {

  render() {
    return (
      <>
        <div id="network">
          <Network 
            k={2}
            numberOfNodes={500}
            rules={[
              {a:0.5, b:0},
              {a:3, b:1}
            ]}
          />
        </div>
      </>

    )
  }
}
