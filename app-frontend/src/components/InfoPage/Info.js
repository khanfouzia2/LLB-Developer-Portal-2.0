import React, {Component} from 'react';
import { AuthConsumer } from '../../context/authContext';
import './Info.css';
class Info extends Component {
  renderInfoButton = (userInfo) => {
    if(userInfo.isAuth) {
       return <></>
    }
    else {
      return(
          <>    
                <a href="/register" className="btn btn-lg btn-dark" role="button">SIGN UP</a>
                <br></br>
                <p>or</p>
                <a href="/login" className="btn btn-lg btn-dark" role="button">LOGIN</a>
          </>
        );
    }
  }
  
  render() {
    return(
      <AuthConsumer>
      { ({userInfo}) => (
         <>
          <div className="info-wrapper">
              <div className="App-custom-page-content">
                  <h1>Welcome to the LLB Developer Portal</h1>
                  <br/>
                  <p>The goal of the Living Lab Bus (LLB) project is to enable and support faster development and evaluation of mobility services through a concrete, open test environment in a real public transport context.</p>
                  <br/>
                  <p margin>Join the Developer Portal and create your own application for public transport using our guides, tools and APIs!</p>
                  <br/> 
                  {this.renderInfoButton(userInfo)}
              </div>
            </div>
         </>
      )}
    </AuthConsumer>
    ) 
  }
}

export default Info;