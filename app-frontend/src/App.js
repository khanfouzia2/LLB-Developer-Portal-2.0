import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Example from './components/Example/Example';
import APIPage from './components/APIPage/APIPage';

import NewsCardList from './components/News/NewsCardList';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import SideNavBar from './components/NavBar/SideBarNav';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
           <div>
              <SideNavBar>
                <Route exact path="/news" component={NewsCardList} />
                <Route exact path="/api" render={props => <APIPage URL="http://petstore.swagger.io/v2/swagger.json" {...props} />} />
              </SideNavBar>
           </div>
              
        </Router>
      </div>
    );
  }
}

export default App;
