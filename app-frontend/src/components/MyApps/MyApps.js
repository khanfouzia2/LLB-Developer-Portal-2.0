import React, { Component } from 'react';
import AuthContext from '../../context/auth-context';
import PublicDisplay from './PublicDisplay';
import MobileApps from './MobileApps';

class MyApps extends Component {
  static contextType = AuthContext;

  renderContent = () => {
    const { isAuth } = this.context;
    if (isAuth) {
      return (
        <>
          <nav className="App-custom-nav">
            <span className="navbar-brand mb-0 h1">MY APPS</span>
          </nav>
          <div className="App-custom-page-content my-app-wrapper">
            <ul className="nav nav-tabs" id="toolsTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#mobileapps" role="tab" aria-controls="mobileApp" aria-selected="true">Mobile Apps</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#publicdisplay" role="tab" aria-controls="publicDisplayApp" aria-selected="false">Public Display</a>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane active" id="mobileapps" role="tabpanel" aria-labelledby="mobileApp-tab">
                <MobileApps></MobileApps>
              </div>
              <div className="tab-pane" id="publicdisplay" role="tabpanel" aria-labelledby="publicdisplay-tab">
                <PublicDisplay></PublicDisplay>
              </div>
            </div>
          </div>
        </>
      );
    }
    else {
      return <></>
    }
  }
  render() {
    return (
      <>
        {this.renderContent()}
      </>
    );
  }
}

export default MyApps;