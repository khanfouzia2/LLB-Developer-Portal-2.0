import React, { Component } from 'react';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import Example from './components/Example/Example';
import APIPage from './components/APIPage/APIPage';
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
import ForumMain from './components/Forum/ForumMain';
import ThreadMain from './components/Forum/ThreadMain';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import BrowseFeedback from './components/FeedbackForm/BrowseFeedback';

import EditThread from './components/Forum/EditThread';
import MyApps from './components/MyApps/MyApps';
import EditAppWrapper from './components/MyApps/EditAppWrapper';

import EditProfile from './components/User/EditProfile';
import GlobalState from './context/GlobalState';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import SideNavBar from './components/NavBar/SideBarNav';
import AuthContext from './context/auth-context'

import './App.css';

class App extends Component {
  static contextType = AuthContext;

  renderPortalContent = () => (
    <SideNavBar>
      <div id="main-content" >
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
        <Route exact path="/givefeedback" component={FeedbackForm}/>
        <Route exact path="/myapps" component={MyApps}/>
        <Route exact path="/myapps/create" component={EditAppWrapper}/>
        <Route exact strict path="/myapps/:id/" component={EditAppWrapper}/>

        <Switch>
          <Route exact path="/forum/thread/:id/edit" component={EditThread} />
          <Route exact path="/forum/thread/:id" component={ThreadMain} />
          <Route exact path="/forum/" component={ForumMain} />
        </Switch>
        <Route exact path="/profile/edit" component={EditProfile} />
        {/* Admin part: */}
        <Route exact path="/admin/feedbacks" component={BrowseFeedback} />
      </div>
    </SideNavBar>
  );

  render() {
    console.log(this.context.first_name);

    return (
      <GlobalState>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/register" component={RegisterForm} />
              <Route render={this.renderPortalContent} />
            </Switch>
          </Router>
        </div>
      </GlobalState>

    );
  }

}

export default App;
