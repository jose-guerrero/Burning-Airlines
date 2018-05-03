import React, { PureComponent as Component } from 'react';
import FlightsSearch from './FlightsSearch';
import ReservationForm from './ReservationForm';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flight_id: '',
      prev_flight_id: '',
      username: props.username
    }
  }

  resetFlightId = () => {
    this.setState({
      flight_id: ''
    });
  }

  storeFlightId = (flight_id) => {
    this.setState({
      prev_flight_id: this.state.flight_id,
      flight_id: flight_id
    });
  }

  clicking(e){
    e.preventDefault();
     window.location.href = "https://burningairlines.herokuapp.com";
  }


  render() {
        return (
          <div>

          <form onSubmit = {this.clicking} className="logout">
            <div className="grid-logout">
              <div className="cell-logout">
                <p>WELCOME {this.state.username.toUpperCase() }</p>
                <p>Search for a flight right here</p>
              </div>
              <div className="cell-logout">
                <button className="res-button logout-button">
                  Sign Out
                </button>
              </div>
            </div>
          </form>

            <FlightsSearch storeFlightId={ this.storeFlightId } resetFlightId={ this.resetFlightId } />
            { this.state.flight_id !== '' ? <ReservationForm user_id={this.props.user_id} flightId={ this.state.flight_id } /> : null }
          </div>
        );

  }
}

export default Container;
