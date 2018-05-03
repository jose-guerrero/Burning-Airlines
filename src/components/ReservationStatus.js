// import React, { PureComponent as Component } from 'react';
import React from 'react';

function ReservationStatus(props) {
    return (
      <div className="res-status">
        { props.status }
      </div>
    );
}

export default ReservationStatus;
