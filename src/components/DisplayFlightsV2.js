import React, { PureComponent as Component } from 'react';

class DisplayFlightsV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {flight_id: ""};
    this._update = this._update.bind(this);
  }
  _update(flight_id)
  {
    // console.log(flight_id);
      this.setState({flight_id});
  }

  _handleClick = (flight_id) => {
    this.props.passFlightId( flight_id );
  }

  render() {
    // console.log( this.props.flights_all );
    return (
      <div>
        <p>Do we fly your selected route? If we do, available flights will pop up below.</p>
        {this.props.flights_all.map (s=>
          <p key={s.id}>{s.origin} to {s.destination} on {s.date}: Flight {s.number}
          <button className="res-button book" onClick = { () => { this._handleClick(s.id) } }>
            Book Flight
          </button></p>
        )}
      </div>
    );
  }
}

export default DisplayFlightsV2;
