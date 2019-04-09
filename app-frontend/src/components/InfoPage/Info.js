import React, {Component} from 'react';
import AuthContext from '../../context/auth-context';
import './Info.css';
import {Link} from 'react-router-dom';
import { create } from 'domain';
import { FRONT_PAGE_ICONTEXT_1 } from '../../config.js'

// Components
import IconText from './IconText.js';

class Info extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
  }

  renderInfoButton = (userInfo) => {
    const { isAuth } = this.context;
    const orStyle = {margin:'0.5em',fontSize:'0.8em'};

    if(isAuth) {
       return <></>
    }
    else {
      return(
          <div className="container">    
              <div className ="row"> 
                <div className="col-lg-3 col-sm-6 mx-auto border_border-success">
                  <div className="text-center">
                    <Link to="/register" className="btn btn-lg btn-success btn-block" role="button">SIGN UP</Link>
                    <p className="" style={orStyle}>OR</p>
                    <Link to="/login" className="btn btn-lg btn-primary btn-block" role="button">LOGIN</Link>
                  </div>
                </div>
              </div>
          </div>
        );
    }
  }
  
  render() {
    return(
         <>
              <div className="info-wrapper">
              <div className="App-custom-page-content">
                  <h1>Welcome to the LLB Developer Portal</h1>
                  <br/>
                  <div className = "row">
                    <div className= "col-xl-10 mx-auto">
                      <p>The goal of the Living Lab Bus (LLB) project is to enable and support faster development and evaluation of 
                        mobility services through a concrete, 
                        open test environment in a real public transport context. 
                        <br/><br/>
                      
                      Join the Developer Portal and create your own application for public transport using our guides, tools and APIs!</p>
                  
                    </div>
                  
                  </div>
                 
                  <br/>
                  {this.renderInfoButton()}
                  <h2>3 in 1 database – many ways to use</h2>
                  <div className="row mt-5">
                    <div className="col-xl-4">
                      <IconText title="Create" content="Design and code your own application using our guides and APIs." imgSrc="img/create.png"/>
                    </div>
                    <div className="col-xl-4 ">
                     <IconText title="Test" content="Make your app available for testing to find bugs and issues before it goes live." imgSrc="img/test.png"/>
                    </div>
                    <div className="col-xl-4 text-center">
                      <IconText title="Deploy" content="Release your app into the world and follow its progress with our feedback system." imgSrc="img/deploy.png"/>
                    </div>
                  </div>
                </div>
            </div>
         </>
    ) 
  }
}

export default Info;