import React, {Component} from 'react';
import Sidebar from "react-sidebar";
import Accrodion from './Accordion';
import './SideBarNav.css';
import DefaultUserAvatar from './DefaultUserAvatar';
import {Logout} from '../../services/UserApi';
import { Redirect } from 'react-router-dom'
import Context from '../../context/auth-context';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
class SideBarNav extends Component {
    static contextType = Context;

    constructor(props) {
      super(props);
      this.state = {
        sidebarOpen: true,
        redirect: false,
        redirectURL: "",
      };
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.renderGeneralMenu = this.renderGeneralMenu.bind(this);
      this.renderUserInfo = this.renderUserInfo.bind(this);
      this.renderAuthenticateRequiredMenu = this.renderAuthenticateRequiredMenu.bind(this);
      this.renderLogoutButton = this.renderLogoutButton.bind(this);
    }
    onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
    }

    handleLogout = async (e) => {
      try
      {   e.preventDefault();
          await Logout();
          document.cookie = `Authorization=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
          window.location.href = "/";
      }
      catch(err) {
        console.log("Something wrong when logout ")
      }
    }

    renderUserInfo = () => {
      const { first_name, last_name, isAuth } = this.context;

      if(isAuth) {
          return(
            <div className="sidebar-heading">
                          <DefaultUserAvatar FirstName={first_name} LastName={last_name}></DefaultUserAvatar>
                          <p className="text-center">
                            {`${first_name} ${last_name}`}
                            <a href="/profile/edit" className="btn btn-default">
                              <i className="fas fa-user-edit fa-lg"></i>
                            </a>
                          </p>
            </div>
          );
       }
       return <></>
    }

    renderGeneralMenu = () => (
          <div className="list-group list-group-flush">
                        <Link className="list-group-item list-group-item-action bg-light overridde-list-group-item" to="/">INFO</Link>
                        <Link className="list-group-item list-group-item-action bg-light overridde-list-group-item" to="/news/page/1">NEWS</Link>
          </div>
        );

    renderAuthenticateRequiredMenu = () => {
      const { isAuth } = this.context;
      if(isAuth) {
         return (
           <>
              <Accrodion header="CAPITAL AREA">
                          <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/api">
                            API Documemtation
                          </Link>
                          <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/apikey">
                            API Key
                          </Link>
                          <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/tools">
                            Tools
                          </Link>
                          <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/myapps">
                            My Apps
                          </Link>
              </Accrodion>
              <Accrodion header="TAMPERE">
                        <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/">
                            API Key
                        </Link>
                      </Accrodion>
              <Accrodion header="TURKU">
                <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/">
                    API Key
                </Link>
              </Accrodion>
              <Accrodion className="list-group-item list-group-item-action bg-light" header="LAHTI">
                        <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/">
                            API Key
                        </Link>
              </Accrodion>
              <Accrodion className="list-group-item list-group-item-action bg-light" header="CONTACT US">
                        <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/">
                            Report a Bug
                        </Link>
                        <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/givefeedback">
                          Feedback
                        </Link>
              </Accrodion>
              <Link className="list-group-item list-group-item-action bg-light overridde-list-group-item " to="/forum">
                FORUM
              </Link>
           </>
         );
      }
      return null;
    }

    renderLogoutButton = () => {
      const { isAuth } = this.context;

      if(isAuth) {
        return (
          <a onClick={this.handleLogout} className="list-group-item list-group-item-action bg-light overridde-list-group-item logout-btn" href="/">
                      LOG OUT  <i className="fas fa-sign-out-alt"></i>
          </a>
        );
      }
      return <></>
    }
    render() {
      const renderSideBarContent = (
          <>
            <div className="bg-light border-right">
              {this.renderUserInfo()}
              {this.renderGeneralMenu()}
              {this.renderAuthenticateRequiredMenu()}
              {this.renderLogoutButton()}
            </div>
          </>
      );
      const sideBarStyle = { minWidth: "17em", background: "#F8F9FA"}
      if(this.state.redirect){
        return <Redirect to={this.state.redirectURL}/>;
      }
      else {
        return (
          <Sidebar
            sidebar={renderSideBarContent}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            docked = {true}
            styles={{ sidebar: sideBarStyle }}
          >
          {this.props.children}
          {/* <button onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
          </button> */}
        </Sidebar>
        );
      }
    }
}

export default SideBarNav;
