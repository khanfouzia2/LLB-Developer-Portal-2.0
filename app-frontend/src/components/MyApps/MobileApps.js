import React, { Component } from 'react';
import AuthContext from '../../context/auth-context';
import { GetUserMobileApps } from '../../services/MobileAppApi';
import './MobileApps.css'

class MobileApps extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      userMobileApps: [],
    }
    this.renderContains = this.renderContains.bind(this);
    this.renderAppList = this.renderAppList.bind(this);
  }
  componentDidMount = async () => {
    const result = await GetUserMobileApps();
    if (result.status === 200) {
      console.log(result.data);
      this.setState({
        userMobileApps: result.data.mobileApps
      })
    }
  }

  renderAppList = () => {
    if (this.state.userMobileApps.length === 0) {
      return (
        <div className="no-mobile-app">
          <div className="no-mobile-app-content">
            <i className="fas fa-5x fa-archive"></i>
            <h5>You don't have any app. Let's create one !</h5>
            <a href="/myapps/create" className="btn btn-lg btn-primary float-none">Create new app</a>
          </div>
        </div>
      );
    }
  }


  renderContains = () => {
    const { isAuth } = this.context;
    if (!isAuth) {
      return (<></>);
    }
    else {
      return (
        <>
           <nav className="App-custom-nav">
            <span className="navbar-brand mb-0 h1">MOBILE APPS</span>
          </nav>
          <div className="card mobile-app-content">
            <div className="alert alert-secondary">
              <p>
                Through this section you can:
                  <ul>
                  <li>Publish and edit your mobile applications.</li>
                  <li>Set up feedback collection for your apps one by one.
                      There are different question and answering types from which you can choose to
                      create the best suitable set of inquiries for your app.
                    </li>
                  <li>
                    View the results from your feedback
                collection and download the data as a csv file for further analysis and
                visualization.
                    </li>
                </ul>
              </p>
            </div>
            <div className="api-card-content">
              <div className="row">
                {this.renderAppList()}
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  render() {
    return (
      <>
        {this.renderContains()}
      </>
    )
  }
}

export default MobileApps;