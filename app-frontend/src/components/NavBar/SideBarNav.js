import React, {Component} from 'react';
import Sidebar from "react-sidebar";
import Accrodion from './Accordion';
import './SideBarNav.css';
import DefaultUserAvatar from './DefaultUserAvatar';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
class SideBarNav extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sidebarOpen: true
      };
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
    onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
    }

    render() {
      const renderSideBarContent =(
        <React.Fragment>
          <div className="bg-light border-right">
            <div className="sidebar-heading">
                {/* <img className="img-thumbnail rounded-circle img-responsive user-avatar" alt="user-avatar" src="https://www.changingourworld.com/wp-content/uploads/2018/01/avatar-placeholder.png"></img> */}
                <DefaultUserAvatar FirstName="Joe" LastName="Doe"></DefaultUserAvatar>
                <p className="text-center">JOE DOE</p>
            </div>
            <div className="list-group list-group-flush">
              <Link className="list-group-item list-group-item-action bg-light overridde-list-group-item" to="/news/1">NEWS</Link>
              <Link className="list-group-item list-group-item-action bg-light overridde-list-group-item" to="/news/compose">Compose (admin only)</Link>
            </div>

            <Accrodion header="UUSIMAA">
                <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/api">
                  API Documemtation
                </Link>
                <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/">
                  API Key
                </Link>
                <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/">
                  Tools
                </Link>
                <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/">
                  Mobile App Dev
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
                  Report Bug
              </Link>
              <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/">
                Feedback
              </Link>
            </Accrodion>
            <Link className="list-group-item list-group-item-action bg-light overridde-list-group-item " to="/">FORUM</Link>
          </div>
      </React.Fragment>
      );
      const sideBarStyle = { minWidth: "17em", background: "#F8F9FA"}

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

export default SideBarNav;
