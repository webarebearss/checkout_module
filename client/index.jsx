import React from 'react';
import ReactDOM from 'react-dom';
  export default React.PureComponent;
  export const pureComponentAvailable = true;
import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      focused: null
    }
  }

  render () {
    return (
      <div>
        <h1>Hello</h1>
        <SingleDatePicker


                          small={true}
                          block={false}
                          numberOfMonths={1}
                          date={this.state.date}
                          onDateChange={date => this.handleDateChange(date)}
                          focused={this.state.focused}
                          onFocusChange={({ focused }) =>
                            this.setState({ focused })
                          }
                          openDirection="up"
                          hideKeyboardShortcutsPanel={true}
                          />
      </div>
    )
  }
}

ReactDOM.render(<Checkout />, document.getElementById('app'));