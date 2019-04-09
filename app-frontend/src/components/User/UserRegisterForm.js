import React, { Component } from 'react';
import './Form.css'
import { FormRegister } from '../../services/UserApi';
import { Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth-context';
import { GOOGLE_LOGIN } from '../../rest-endpoints';


class UserRegisterForm extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      redirect: false,
      redirectURL: "",
      isError: false,
      message: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (event) => {
    const {updateAuthInfo} = this.context;
    event.preventDefault();
    try {
      let result = await FormRegister(this.state.firstName, this.state.lastName,
        this.state.email, this.state.password);
      const { first_name, last_name, email, role } = result.data;
      updateAuthInfo(true, first_name, last_name, email, role);
      this.setState({ redirect: true, redirectURL: "/" });
    }
    catch (err) {
      console.log(err);
      this.setState({ isError: true, message: "Something wrong :( Please try again." });
    }
  }
  renderMessage = (isError, message) => {
    if (isError) {
      return (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      );
    }
    else return (<></>);
  }
  render() {
    const { redirect, redirectURL, isError, message } = this.state;
    if (redirect) {
      return <Redirect to={redirectURL} />;
    }
    else {
      return (
        <div className="register-form-wrapper" >
          <div className="user-form-grey-filter">
            <div className="user-register-login-form">
              <div className="form-header">
                <img src={process.env.PUBLIC_URL + 'img/LLBlogo.png'} alt="LLB logo" className="img-fluid"></img>
                <br></br>
                <br></br>

                <h3>SIGN UP</h3>
                <br></br>
              </div>
              {this.renderMessage(isError, message)}
              <form onSubmit={event => this.handleSubmit(event)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <input className="form-control" placeholder="First Name" name="firstName" type="text" onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input className="form-control" placeholder="Last Name" name="lastName" type="text" onChange={this.handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input className="form-control" placeholder="E-mail" name="email" type="text" onChange={this.handleChange} />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Password</label>
                      <input className="form-control" placeholder="Password" name="password" type="password" onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input className="form-control" placeholder="Confirm Password" name="confirmPassword" type="password" onChange={this.handleChange} />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-md btn-primary" >SIGN UP</button>
                <a href="/login"><small className="form-text text-muted">Already have an account? Click here to login.</small></a>
              </form>
              <p className="form-header"> - OR -</p>
              <a href={GOOGLE_LOGIN} id="google-button" className="btn btn-block btn-danger">
                <i className="fab fa-google"></i> Sign up with Google
                          </a>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default UserRegisterForm;