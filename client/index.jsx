import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/checkout.jsx';
import $ from 'jquery';
import 'react-dates/initialize';
// css not loading
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0,
      reviews: 0,
      stars: 0,
      cleaningFee: 0,
      guests: 0,
      serviceFee: 0,
      checkIn: '',
      checkOut: '',
      reservations: '',
      startDate: null,
      endDate: null,
      focusedInput: null
    }
  }

// Calls the fetcher on load to get a room from the database
  componentDidMount() {
    this.fetchRoom();
    this.fetchBookings();
  }

  fetchRoom() {
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

  fetchBookings() {
    $.ajax({
      url: '/rooms/bookings/2',
      type: 'get',
      success: (results) => {
        console.log('reservations returned');
        this.setState({
          reservations: results.checkin + '-' + results.checkout
        })
      }
    })
  }

  makeReservation() {
    $.ajax({
      url: '/rooms/2',
      type: 'post',
      data: {
        checkIn: this.state.checkIn,
        checkOut: this.state.checkOut
      },
      success: () => {
        console.log('reserved');
      },
      error: ()=> {
        console.log('failed to book');
      }
    });
  }



  render() {
    return (
      <div>
        <DateRangePicker
          startDateId="startDate"
          endDateId="endDate"
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
        />
      </div>
    )
  }
}

ReactDOM.render(<Checkout />, document.getElementById('app'));