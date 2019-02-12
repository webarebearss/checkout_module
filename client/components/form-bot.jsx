import React from 'react';

class FormBot extends React.Component {
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
        if (this.state.guests + 1 <= this.props.details.maxGuests) {
            this.setState({
                guests: this.state.guests + 1
            });
        }
    }

    render() {
        if (this.props.details.showPayment) {
            return(
            <div className="form-form">
                <div className="form-line">
                    <div className="line-label">Guests: </div>
                    <div className="line-value">
                    <button onClick={this.decrease.bind(this)}> - </button>
                    {this.state.guests}
                    <button onClick={this.increase.bind(this)}> + </button>
                    </div>
                </div>
    
                <div className="form-line">
                    <div className="line-label">{this.props.details.numNights} night(s) x ${this.props.details.nightlyPrice}</div>
                    <div>${this.props.details.numNights * this.props.details.nightlyPrice}</div>
                </div>
    
                <div className="form-line">
                    <div className="line-label">Service Fee:</div>
                    <div>${this.props.details.serviceFee}</div>
                </div>
    
                <div className="form-line">
                    <div className="line-label">Cleaning Fee: </div> 
                    <div>${this.props.details.cleaningFee}</div>
                </div>
                
                <div className="form-total">
                    <div className="line-label">Total: </div> 
                    <div>${this.props.details.numNights * this.props.details.nightlyPrice + this.props.details.serviceFee + this.props.details.cleaningFee}</div>
                </div>
    
                 <form onSubmit={(event) => {
                     event.persist();
                     this.setState(
                        {total: this.props.details.numNights * this.props.details.nightlyPrice + this.props.details.serviceFee + this.props.details.cleaningFee},
                        () => this.props.checkOpenings(event, this.state)
                     )}}>
    
                   <input type="submit" className="sub-but" value="Book" />
                 </form>
            </div>
            )
        } else {
            return (
                <div>
                    <form onSubmit={(event) => {
                        event.persist();
                        this.setState(
                            {total: this.props.details.numNights * this.props.details.nightlyPrice + this.props.details.serviceFee + this.props.details.cleaningFee},
                            () => this.props.checkOpenings(event, this.state)
                        )}}>
        
                        <input type="submit" className="sub-but" value="Book" />
                    </form>
                </div>
            )
        }
    }
}

export default FormBot;