import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './styles/desc.scss';

class ListDesc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxGuests: 0,
            introDesc: '',
            spaceDesc: '',
            guestDesc: '',
            otherDesc: ''
        }
    }
    componentDidMount() {
        this.fetchRoom();
    }

    fetchRoom() {
        $.ajax({
          url: '/rooms/1',
          type: 'GET',
          success: (results) => {
            console.log('results returned');
            // sets the state to include properties of the retrieved room
            this.setState({
                maxGuests: results[0].guests,
                introDesc: results[0].introDesc,
                spaceDesc: results[0].spaceDesc,
                guestDesc: results[0].guestDesc,
                otherDesc: results[0].otherDesc
            });
          },
          error: () => {
            console.log('err');
          }
        });
      }

    render() {
        return(
            <div className="container">
                <div className="introDesc">{this.state.introDesc}</div>
                <div className="section-header">The Space</div>
                <div className="spaceDesc">{this.state.spaceDesc}</div>
                <div className="section-header">Interaction with guests</div>
                <div className="guestDesc">{this.state.guestDesc}</div>
                <div className="section-header">Other things to note</div>
                <div className="otherDesc">{this.state.otherDesc}</div>
            </div>
        )
    }
}

ReactDOM.render(<ListDesc />, document.getElementById('desc'));