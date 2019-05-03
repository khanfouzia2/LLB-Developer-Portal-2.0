import React, { Component } from 'react';
import AuthContext from '../../context/auth-context';
import { GetUserMobileApps } from '../../services/MobileAppApi';
import './MobileApps.css'
import { Link } from "react-router-dom"

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
            <Link to="/myapps/create" className="btn btn-lg btn-primary float-none">Create new app</Link>
          </div>
        </div>
      );
    }
    else {
      const renderedAppList = this.state.userMobileApps.map(x => (
        <tr key={x.id}>
          <th>{x.application_name}</th>
          <td>{x.description}</td>
          <td>{x.title_type}</td>
          <td>{x.permissions.toString()}</td>
          <td>{x.zip_file_name}</td>
          <td>{x.status}</td>
          <td>{x.updated_at}</td>
          <td><button className="btn btn-secondary">Edit</button></td>
        </tr>
      ));
      return (
        <>
         <Link to="/myapps/create" className="btn btn-lg btn-primary ">Create new app</Link>
         <table className="table applist-table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Application Name</th>
                <th scope="col">Application Description</th>
                <th scope="col">Title Type</th>
                <th scope="col">Permission</th>
                <th scope="col">Zip File Name</th>
                <th scope="col">Status</th>
                <th scope="col">Last Update</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {renderedAppList}
            </tbody>
          </table>
          
        </>

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