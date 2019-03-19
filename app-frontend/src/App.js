import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Example from './components/Example/Example';
import APIPage from './components/APIPage/APIPage';

import NewsCardList from './components/News/NewsCardList';
import NewsCompose from './components/News/NewsCompose';
import ToolsHome from './components/Tools/Home/ToolsHome';
import DesignGuidelines from './components/Tools/Guidelines/DesignGuidelines';
import DeveloperGuidelines from './components/Tools/Guidelines/DeveloperGuidelines';
import InspirationGuidelines from './components/Tools/Guidelines/InspirationGuidelines';
import Reittiopas from './components/Tools/ExampleApplications/Reittiopas';
import UserForm from './components/User/UserLoginForm';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import SideNavBar from './components/NavBar/SideBarNav';
import './App.css';

class App extends Component {
  renderPortalContent = () => (
    <SideNavBar>
      <div id="main-content" className="container">
        <Route exact path="/news/compose" component={NewsCompose} />
        <Route exact path="/news/page/:page" component={NewsCardList} />
        <Route exact path="/news" component={NewsCardList} />
        <Route exact path="/api" render={props => <APIPage URL="http://petstore.swagger.io/v2/swagger.json" {...props} />} />
        <Route exact path="/tools" component={ToolsHome} />
        <Route exact path="/tools/designGuidelines" component={DesignGuidelines} />
        <Route exact path="/tools/developerGuidelines" component={DeveloperGuidelines} />
        <Route exact path="/tools/inspirationGuidelines" component={InspirationGuidelines} />
        <Route exact path="/tools/reittiopas" component={Reittiopas} />
      </div>
    </SideNavBar>
 );

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login" component={UserForm} />
            <Route render={this.renderPortalContent} />
          </Switch>
        </Router>

      </div>
    );
  }

}

export default App;
