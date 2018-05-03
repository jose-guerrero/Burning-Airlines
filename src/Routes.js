import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import App from './components/App';


const Routes = (
  <Router>
    <div>
      <Route exact path="/" component = {Home} />
      <Route exact path="/jose" render={props => <App user_id="7" {...props} />} />
      <Route exact path="/maddi" render={props => <App user_id="8" {...props} />} />
      <Route exact path="/craigsy" render={props => <App user_id="9" {...props} />} />
    </div>
  </Router>
)

export default Routes;
