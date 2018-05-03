import React, { PureComponent as Component } from 'react';
import SeatMap from './SeatMap';
import FlightInfo from './FlightInfo';
import UserInfo from './UserInfo';
import ReservationStatus from './ReservationStatus';
import ExistingRes from './ExistingRes';

import axios from 'axios';


class SubmitComplex extends Component {
  render() {
    return (
      <div>
        <button className="res-button" onClick={ this.props.onClick }>Book</button>
      </div>
    );
  }
}

// <Display />
// <ReservationForm className={ ...hidden } flight={ this.state.flight_id } user={ this.state.user_id } } />

// PARENT

class ReservationForm extends Component {
  saveSelected = (s) => {
    this.setState({
      selectedSeat: s
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      flight_id: props.flightId,
      flight: {},
      user: {},
      takenSeats: [],
      selectedSeat: "",
      status: ""
    };
    const fetchFlight = (id) => {
      // console.log( id );
      axios.get(`https://burningairlinesdb.herokuapp.com/flights/${ id }.json`)
        .then( results => {
           this.setState({ flight: results.data })
          })
        .then( () => {
          const reservations = this.state.flight.reservations.slice();
          const takenSeats = reservations.map(r => r.seat);
          // console.log('Taken seats on this flight: ', takenSeats);
          this.setState({ takenSeats });
        });
      setTimeout( () => { fetchFlight( this.state.flight_id ) }, 1000 );
      // setTimeout( function() { fetchFlight( this.state.flight_id ) }, 3000 );
    }
    const fetchUser = () => {
      axios.get(`https://burningairlinesdb.herokuapp.com/users/${ props.user_id }.json`)
        .then( results => this.setState({ user: results.data }) );
      setTimeout( fetchUser, 1000 );
    }
    fetchFlight( this.state.flight_id );
    fetchUser();
  }

  componentDidUpdate() {
    this.setState({
      flight_id: this.props.flightId
    });
  }


  addNewRes = () => {
    axios.post(
      'https://burningairlinesdb.herokuapp.com/reservations.json',
      {
        reservation: {
          seat: this.state.selectedSeat,
          flight_id: this.state.flight.id,
          user_id: this.state.user.id
        }
      }
    )
    .then(response => {
      // console.log( response.statusText === "Created" ? "Reservation complete. Thank you for choosing Burning." : "" );
      this.setState({
        status: response.statusText === "Created" ? "Reservation complete. Thank you for choosing Burning." : ""
      });
    })
    .catch(error => {
      // console.log( error.message === "Request failed with status code 422" ? "Sorry, that seat is unavailable." : "" );
      this.setState({
        status: error.message === "Request failed with status code 422" ? "Sorry, that seat is unavailable. Please choose an available seat or call 1800 BURNING for assistance." : ""
      });
    })


  }


  render() {
    return (
      <div>
        <h1>Make a reservation</h1>
        <UserInfo userName={ this.state.user.name } />
        <FlightInfo flightNumber={ this.state.flight.number } flightId={ this.state.flight.id } />
        <SeatMap rows={ this.state.flight.rows } cols={ this.state.flight.cols } takenSeats={ this.state.takenSeats } passSeat={ this.saveSelected } />
        <SubmitComplex onClick={ this.addNewRes } />
        <ReservationStatus status={ this.state.status } />
        {/* <ExistingRes res={ this.state.user } /> */}
        { this.state.user !== {} ? <ExistingRes res={ this.state.user } /> : null }
        {/* { this.state.flight_id !== '' ? <ReservationForm flightId={ this.state.flight_id } /> : null } */}
      </div>
    );
  }
}


export default ReservationForm;
