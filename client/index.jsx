import React from 'react';
import ReactDOM from 'react-dom';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      focused: null
    }
  }

render() {
    return (
      <div>Hello</div>
    );
  }
}

ReactDOM.render(<Checkout />, document.getElementById('app'));