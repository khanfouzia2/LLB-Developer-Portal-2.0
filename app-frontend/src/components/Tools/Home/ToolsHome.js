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
      mobileApp: true,
      publicDisplayApp: false,
      mobileAppStyle: "darkslategrey",
      publicDisplayAppStyle: "slategrey"
    }
  }

  mobileAppSelect() {
    this.setState({
      mobileApp: true,
      publicDisplayApp: false,
      mobileAppStyle: "darkslategrey",
      publicDisplayAppStyle: "slategrey"

    })
  }

  publicDisplayAppSelect() {
    this.setState({
      mobileApp: false,
      publicDisplayApp: true,
      mobileAppStyle: "slategrey",
      publicDisplayAppStyle: "darkslategrey"
    })
  }

  render() {

    return(
        <div>
            <nav className="App-custom-nav">
                <span className="navbar-brand mb-0 h1">Development Tools</span>
            </nav>
            <div className="tools-page-content" id="tools">
            
                <nav className="navbar navbar-expand-sm bg-light">

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button type="button" onClick={()=>this.mobileAppSelect()} className="btn text-white" style={{backgroundColor: this.state.mobileAppStyle}}>Mobile App</button>
                        </li>
                        <li className="nav-item">
                            <button type="button" onClick={()=>this.publicDisplayAppSelect()} className="btn text-white" style={{backgroundColor: this.state.publicDisplayAppStyle}}>Public Display App</button>
                        </li>
                    </ul>

                </nav>
                {
                  this.state.mobileApp?
                  <div>
                    <MobileApp />
                  </div>
                  :this.state.publicDisplayApp?
                  <div>
                    <PublicDisplayApp />
                  </div>
                  :null
                }

            </div>
        </div>
    );
  }
}

export default ToolsHome;