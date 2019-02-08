import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/checkout.jsx';
import $ from 'jquery';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0,
      reviews: 0,
      stars: 0,
      cleaningFee: 0,
      guests: 0,
      serviceFee: 0
    }
  }

// Calls the fetcher on load to get a room from the database
  componentDidMount() {
    this.fetcher();
  }

  fetcher() {
    $.ajax({
      url: '/rooms/2',
      type: 'GET',
      success: (results) => {
        console.log('results returned');
        // sets the state to include properties of the retrieved room
        this.setState({
          price: results[0].price,
          reviews: results[0].reviews,
          stars: results[0].stars,
          cleaningFee: results[0].cleaningFee,
          guests: results[0].guests,
          serviceFee: results[0].serviceFee,
        })
      },
      error: () => {
        console.log('err');
      }
    });
  }

  render() {
    return (
      <div>
        <Form info={this.state}/>
      </div>
    )
  }
}

ReactDOM.render(<Checkout />, document.getElementById('app'));