import React, {Component} from 'react';
import './Form.css'
import {CredentialLogin} from '../../services/UserApi';
import { Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth-context';
import {GOOGLE_LOGIN} from '../../rest-endpoints';

class UserLoginForm extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state= {
      email: "",
      password: "",
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
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = async (event) => {
    const {updateAuthInfo} = this.context;
    event.preventDefault();
    try {
      let result = await CredentialLogin(this.state.email, this.state.password);
      const { first_name, last_name, email, role, id, is_single_sign_on, is_finished_survey } = result.data;
      updateAuthInfo(true, first_name, last_name, email, role,id, is_finished_survey ,is_single_sign_on);
      this.setState({redirect:true, redirectURL:"/"});            
    }
    catch(err) {
      console.log(err);
      if(err.response.status === 401 || err.response.status === 404) {
        this.setState({isError:true, message: "Incorrect email or password" });
      }
    }  
  }
  renderMessage = (isError, message) => {
    if(isError) {
      return (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      );
    }
    else return (<></>);
  }

  renderForm = () => {
    
  }

  render() {
    const {redirect, redirectURL, isError, message} = this.state;
    if(redirect) {
      return <Redirect to={redirectURL}/>;
    }
    else {
      return (
            <div className="login-form-wrapper" >
               <div className="user-form-grey-filter">
                 <div className="user-register-login-form">
                   <div className="form-header">
                     <img src={process.env.PUBLIC_URL + 'img/LLBlogo.png'} alt="LLB logo" className="img-fluid"></img>
                     <br></br>
                     <br></br>
 
                     <h3>LOG IN</h3>  
                   </div>
                   {this.renderMessage(isError, message)}
                   <form onSubmit= {event => this.handleSubmit(event)}>
                     <div className="form-group">
                         <label>Email</label>
                         <input className="form-control" placeholder="E-mail" name="email" type="text" onChange={this.handleChange} />
                     </div>
                     <div className="form-group">
                         <label>Password</label>
                         <input className="form-control" placeholder="Password" name="password" type="password" onChange={this.handleChange}/>
                     </div>
                     <button type="submit" className="btn btn-md btn-primary" >LOG IN</button>
                     <a href="/"><small className="form-text text-muted">Doesn't have an account? Click here to register.</small></a>
                     <a href="/"><small className="form-text text-muted">Forget password?</small></a>
                   </form>
                   <p className="form-header"> - OR -</p>
                   <a href={GOOGLE_LOGIN} id="google-button" className="btn btn-block btn-danger">
                     <i className="fab fa-google"></i> Log in with Google
                   </a>
                 </div>
             </div>
          </div>
      );
    }
  }
}

export default UserLoginForm;