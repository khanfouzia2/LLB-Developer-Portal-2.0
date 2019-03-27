import React, { Component } from 'react';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import Example from './components/Example/Example';
import APIPage from './components/APIPage/APIPage';
import {AuthProvider} from './context/authContext';
import NewsCardList from './components/News/NewsCardList';
import NewsCompose from './components/News/NewsCompose';
import News from './components/News/News';
import ToolsHome from './components/Tools/Home/ToolsHome';
import DesignGuidelines from './components/Tools/Guidelines/DesignGuidelines';
import DeveloperGuidelines from './components/Tools/Guidelines/DeveloperGuidelines';
import InspirationGuidelines from './components/Tools/Guidelines/InspirationGuidelines';
import LoginForm from './components/User/UserLoginForm';
import RegisterForm from './components/User/UserRegisterForm';
import InfoPage from './components/InfoPage/Info';
import NotFound from './components/Misc/NotFound';
import APIKey from './components/APIPage/APIKey';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import SideNavBar from './components/NavBar/SideBarNav';

import './App.css';

class App extends Component {
  renderPortalContent = () => (
    <SideNavBar>
      <div id="main-content">
        <Route exact path="/" component={InfoPage} />
        <Route exact path="/news/compose" component={NewsCompose} />
        <Route exact path="/news/page/:page" component={NewsCardList} />
        <Route exact path="/news" component={NewsCardList} />
        <Route exact path="/news/id/:id" component={News} /> 
        <Route exact path="/api" render={props => <APIPage URL={process.env.PUBLIC_URL + 'swagger/swagger.json'} {...props} />} />
        <Route exact path="/apikey" component={APIKey} /> 
        <Route exact path="/tools" component={ToolsHome} />
        <Route exact path="/tools/designGuidelines" component={DesignGuidelines} />
        <Route exact path="/tools/developerGuidelines" component={DeveloperGuidelines} />
        <Route exact path="/tools/inspirationGuidelines" component={InspirationGuidelines} />
      </div>
    </SideNavBar>
 );

  render() {
    return (
      <div className="App">
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/register" component={RegisterForm} />
              <Route render={this.renderPortalContent} />
            </Switch>
          </Router>
        </AuthProvider>
      </div>
    );
  }

}

export default App;
