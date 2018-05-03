import React, {PureComponent as Component} from 'react';
// import {Link} from 'react-router-dom';
import SignupForm from './SignupForm'

class Home extends Component{

  render(){
    // let user_name = "Jose";
    // let url_name = "/"+user_name;
    return (
      <div className="login-form">
        <h1 className="logo login-logo">BURNING AIRLINES</h1>
        <img src="https://i.imgur.com/HGpVOhb.png" alt="Flames and Death"/>
        <h2 className="welcome">welcomes you</h2>
        <p>Have an account? Please login below.</p>
        <SignupForm />
        <p>If you need a customer account, call 1800 BURNING and we would love to help.</p>
      </div>
    );
  }
}

export default Home;
