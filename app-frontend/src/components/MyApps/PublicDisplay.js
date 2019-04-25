import React, { Component } from 'react';
import AuthContext from '../../context/auth-context';
import './PublicDisplay.css'

class PublicDisplay extends Component {
  static contextType = AuthContext;

  renderContent = () => {
    const { isAuth } = this.context;
    if (isAuth) {
      return (
        <>
          <nav className="App-custom-nav">
            <span className="navbar-brand mb-0 h1">PUBLIC DISPLAY DEVELOPMENT</span>
          </nav>
          <div className="">
            <div className="card">
              <div className="api-card-content">
                <div className="row">
                  <div className="col-xs-2">
                    <i className="fas fa-bus fa-10x display-dev-bus-icon"></i>
                  </div>
                  <div className="col-md-10 display-dev-bus-content">
                    <div className="alert alert-secondary">
                      <p className="">Public transportation is a growing and transforming business,
                        influenced and disrupted currently by forces like digitalization,
                        urbanization and environmentalism.
                        In order to stay competitive and evolve,
                        public transportation has to improve its ability to meet the varying needs
                        and aspirations of the passengers.
                        The travel experience of bus passengers may be improved through innovative
                        public screen services/applications. Currently we offer real-time data from
                        buses operated by the Helsinki Region Transport (HSL)
                        in Helsinki and Espoo to be utilized in your public display services.
                        The data can be accessed through the 
                        <a href="/api"> API DOCUMENTATION </a> and <a href="/apikey"> API KEY </a>
                        sections of this portal.
                        In the future, more APIs will be made available in addition to the LLB REST API!
                      </p>
                    </div>
                   
                    <ul className="list-group">
                    <li className="list-group-item list-group-item-action list-group-item-secondary">Current details</li>
                    <li className="list-group-item">The data is available via LLB REST API and updated once in a second (1 Hz).</li>
                    <li className="list-group-item">Current public screens: 21,5”, non-interactive Full HD display located in the front of the bus, behind the driver.</li>
                    <li className="list-group-item">Services are displayed through a browser, from specified URL and with desired intervals.</li>
                    <li className="list-group-item">For the development, we recommend HTML5 and related technologies.</li>
                    <li className="list-group-item">
                      The data available via LLB REST API has three main sources:
                      <ul>
                        <li>Onboard positioning and 3D sensors (uBlox NEO-M8L)</li>
                        <li>TinyNode sensor hubs placed in 3 points in the bus (temperature, humidity, air pressure, battery level)</li>
                        <li>Vehicle CAN bus data</li>
                      </ul>
                    </li>
                  </ul>
                  </div>                
                </div>

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

export default PublicDisplay;