import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Example from './components/Example/Example';
//import APIPage from './components/APIPage/APIPage';

import NewsCardList from './components/News/NewsCardList';
import NewsCompose from './components/News/NewsCompose';

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
                <div id="main-content" className="container">
                  <Route exact path="/news" component={NewsCardList} />
                  <Route exact path="/news/compose" component={NewsCompose} />
                  {/* <Route exact path="/api" render={props => {<APIPage URL="http://petstore.swagger.io/v2/swagger.json" {...props} />} } /> */}
                </div>
              </SideNavBar>
           </div>

        </Router>
      </div>
    );
  }

}

export default App;
