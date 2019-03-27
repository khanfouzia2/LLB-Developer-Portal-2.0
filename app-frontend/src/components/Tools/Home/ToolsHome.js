import React, {Component} from 'react';
import './Tools.css';
import MobileApp from './MobileApp';
import PublicDisplayApp from './PublicDisplayApp';

/*
  Tools home page
*/

class ToolsHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mobileApp: true
    }
  }

  render() {

    return(
        <div>
            <nav className="App-custom-nav">
                <span className="navbar-brand mb-0 h1">Development Tools</span>
            </nav>
            <div className="tools-page-content App-custom-page-content" id="tools">
            
              <ul className="nav nav-tabs" id="toolsTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="mobileApp-tab" data-toggle="tab" href="#mobileApp" role="tab" aria-controls="mobileApp" aria-selected="true">mobileApp</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="publicDisplayApp-tab" data-toggle="tab" href="#publicDisplayApp" role="tab" aria-controls="publicDisplayApp" aria-selected="false">publicDisplayApp</a>
                </li>
              </ul>
              
              <div className="tab-content">
                <div className="tab-pane active" id="mobileApp" role="tabpanel" aria-labelledby="mobileApp-tab"><MobileApp /></div>
                <div className="tab-pane" id="publicDisplayApp" role="tabpanel" aria-labelledby="publicDisplayApp-tab"><PublicDisplayApp /></div>
              </div>

            </div>
        </div>
    );
  }
}

export default ToolsHome;