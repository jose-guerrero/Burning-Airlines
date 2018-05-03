import React, { PureComponent as Component } from 'react';
import axios from 'axios';

class ExistingRes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    }
  }

  _handleClick = (res_id,array_res) => {
    // console.log( res_id );
    // console.log(array_res);

    axios.delete(`https://burningairlinesdb.herokuapp.com/reservations/${res_id.id}`).then(
        this.setState({
          status: "Reservation successfully cancelled."
        })
    );



  }


  render() {

    if (Object.keys(this.props.res).length!== 0){

      let fio= this.props.res.reservations;
      // console.log(fio);
      if (fio.length > 0){
        return (
          <div>
            <p>MY RESERVATIONS</p>
            {fio.map (s=> <p key={s.id}><span className="flight-span">{s.flight.date} Flight {s.flight.number} - {s.flight.origin} to {s.flight.destination}, Seat {s.seat}    </span><button className="res-button book" onClick = { () => { this._handleClick(s,fio) } }>Cancel Reservation</button></p>

            )}
            <p className="res-status">{this.state.status}</p>
          </div>
        );
      }
      else {
        return(
          <div>No current reservations</div>
        );
      }
    }
    else {

      // console.log(this);
      return (
        <div>No current reservations</div>
      )
    }
  }
}

export default ExistingRes;
