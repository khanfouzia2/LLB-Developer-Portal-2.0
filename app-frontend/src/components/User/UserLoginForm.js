import React, {Component} from 'react';
import './UserLoginForm.css'
class UserLoginForm extends Component {
  
  render() {
    return (
        <div className="main-form" >
              <div className="login-grey-filter">
                <div className="login-form">
                  <div className="form-header">
                    <img src={process.env.PUBLIC_URL + 'img/LLBlogo.png'} alt="LLB logo" className="img-fluid"></img>
                    <br></br>
                    <br></br>

                    <h3>LOG IN</h3>  
                  </div>
                 
                  <form >
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" placeholder="E-mail" name="email" type="text" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" placeholder="Password" name="password" type="password"  />
                    </div>
                    <button type="submit" className="btn btn-md btn-primary">LOG IN</button>
                    <a href="/"><small id="emailHelp" className="form-text text-muted">Doesn't have an account? Click here to register.</small></a>
                    <a href="/"><small id="emailHelp" className="form-text text-muted">Forget password?</small></a>
                  </form>
                  <p className="form-header"> - OR -</p>
                  <button id="google-button" className="btn btn-block btn-danger">
                  <i className="fab fa-google"></i> Log in with Google
                  </button>
                </div>
            </div>
        </div>
    );
  }
}

export default UserLoginForm;