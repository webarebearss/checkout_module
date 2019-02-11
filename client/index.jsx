import React from 'react';
import ReactDOM from 'react-dom';
import FormBot from './components/form-bot.jsx';
import Header from './components/form-top.jsx';
import $ from 'jquery';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './styles/input.scss';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nightlyPrice: 0,
      reviews: 0,
      stars: 0,
      cleaningFee: 0,
      serviceFee: 0,
      minNights: 0,
      maxGuests: 0,
      numGuests: 1,
      numNights: 0,
      startDate: null,
      endDate: null,
      focusedInput: null,
      reservedDays: [],
      clearDates: true
    }
  }

// Pulls listing details and reservations for the room on page load
  componentDidMount() {
    this.fetchRoom();
    this.fetchBookings();
  }

// Get request for listing information
  fetchRoom() {
    $.ajax({
      url: '/rooms/1',
      type: 'GET',
      success: (results) => {
        console.log('results returned');
        // sets the state to include properties of the retrieved room
        this.setState({
          nightlyPrice: results[0].price,
          reviews: results[0].reviews,
          stars: results[0].stars,
          cleaningFee: results[0].cleaningFee,
          maxGuests: results[0].guests,
          serviceFee: results[0].serviceFee,
          minNights: results[0].minNights,
        });
      },
      error: () => {
        console.log('err');
      }
    });
  }

// Get request to server. Populates blockedDays with ranges
// Clears the reservedDays to prevent duplicate entries and reduce memory
  fetchBookings() {
    this.setState({
      reservedDays: []
    });

    $.ajax({
      url: '/rooms/bookings/1',
      type: 'get',
      success: (results) => {
        console.log('reservations returned');
        for (var i = 0; i < results.length; i++) {
          var newState = this.state.reservedDays.concat([[results[i].checkin, results[i].checkout]]);
          this.setState({
            reservedDays: newState
          });
        }
      }
    })
  }

  // Checks to see if any dates between start and end have already been booked
  checkOpenings(event, data) {
    event.preventDefault();
    console.log(data);

    var conflict = false;
    var resDates = this.state.reservedDays;

    for (var j = 0; j < resDates.length; j++) {
      if (moment(resDates[j][0], "MM-DD-YYYY").isBetween(this.state.startDate, this.state.endDate)) {
        conflict = true;
        break;
      }
    }

    // If conflict in dates, resets startDate and endDate to null
    // Else, calls makeReservation and does POST request to the server
    if (conflict) {
      this.setState({
        startDate: null,
        endDate: null
      });
      console.log('conflict');
      conflict = false;
    } else {   
      console.log('no conflict');
      this.makeReservation(data);
    }
  }

  // Makes post request to server to add reservation to bookings table
  makeReservation(reservationInfo) {
    // Takes the date from the moment and replaces the / with - for entry into the database
    var checkin = this.state.startDate.format('L').replace(/[/]/g, '-');
    var checkout = this.state.endDate.format('L').replace(/[/]/g, '-');

    $.ajax({
      url: '/rooms/1',
      type: 'post',
      data: {
        checkIn: checkin,
        checkOut: checkout,
        numGuests: reservationInfo.guests,
        total: reservationInfo.total
      },
      // On successful booking, makes a GET request to update the list of blockedDays
      success: () => {
        console.log('reserved');
        this.fetchBookings();
      },
      error: ()=> {
        console.log('failed to book');
      }
    });
  }

  // Calculates the number of nights the reservation is
  // Only calculates if both startDate and endDate have non-null values
  calculateDays() {
    console.log('hello');
    if (this.state.startDate !== null && this.state.endDate !== null) {
      this.setState({
        numNights: (this.state.endDate).diff(this.state.startDate, 'days')
      })
    } else {
      console.log('null');
      this.setState({
        numNights: 0
      })
    }
  }

  // Checks each date in the calendar against the ranges for blockedDates
  // If the range contains the date, returns true and blocks the date
  isDayBlocked(day) {
    var resDates = this.state.reservedDays;
    for (var i = 0; i < resDates.length; i++) {
      if (day.isBetween(moment(resDates[i][0], "MM-DD-YYYY"), moment(resDates[i][1], "MM-DD-YYYY"), 'days', '[]')) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div>
        <div>
          <Header info={this.state}/>
        </div>
        <div>
          <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }) => { 
              this.setState({ startDate, endDate }, () => {this.calculateDays()})
            }}
            focusedInput={this.state.focusedInput}
            showClearDates={true}
            numberOfMonths={1}
            minimumNights={this.state.minNights}
            isDayBlocked={this.isDayBlocked.bind(this)}
            onFocusChange={(focusedInput) => { 
              this.setState({ focusedInput })
            }}
          />
        </div>
        <div>
          <FormBot checkOpenings={this.checkOpenings.bind(this)} prop={this.state}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Checkout />, document.getElementById('app'));