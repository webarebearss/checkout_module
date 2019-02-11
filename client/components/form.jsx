import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            total: 0,
        }
    }

    decrease() {
        console.log('dec');
        if (this.state.guests - 1 > 0) {
            this.setState({
                guests: this.state.guests - 1
            });
        }
    }

    increase() {
        console.log('inc');
        if (this.state.guests + 1 <= this.props.prop.maxGuests) {
            this.setState({
                guests: this.state.guests + 1
            });
        }
    }

    render() {
        return(
        <div>
            <button onClick={this.decrease.bind(this)}>-</button>
            {this.state.guests}
            <button onClick={this.increase.bind(this)}>+</button>

            <div>{this.props.prop.numNights} night(s) x ${this.props.prop.nightlyPrice}</div>
            <div>Service Fee: ${this.props.prop.serviceFee}</div>
            <div>Cleaning Fee: ${this.props.prop.cleaningFee}</div>
            <div>
                Total: ${this.props.prop.numNights * this.props.prop.nightlyPrice + this.props.prop.serviceFee + this.props.prop.cleaningFee}
            </div>


             <form onSubmit={(event) => {
                 event.persist();
                 this.setState(
                    {total: this.props.prop.numNights * this.props.prop.nightlyPrice + this.props.prop.serviceFee + this.props.prop.cleaningFee},
                    () => this.props.checkOpenings(event, this.state)
                 )}}>

               <input type="submit" value="Book" />
             </form>
        </div>
        )
    }
}

export default Form;