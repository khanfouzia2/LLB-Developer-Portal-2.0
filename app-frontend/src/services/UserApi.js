import axios from 'axios';
import {USER_FORM_REGISTER, USER_LOGIN, USER_LOGOUT} from '../rest-endpoints';
axios.defaults.withCredentials = true;
const CredentialLogin = (email, password) => {
  return axios.post(USER_LOGIN,
      {
        email,
        password
      },
      {withCredentials: true}
    );
};

const GmailLogin = () => {}

const FormRegister = async (first_name, last_name, email, password) => {
  return axios.post(USER_FORM_REGISTER, 
    {
      first_name, 
      last_name, 
      email, 
      password
    });
   };

const Logout = async () => {
     return axios.get(USER_LOGOUT, {withCredentials: true});
   }


export {CredentialLogin, GmailLogin, FormRegister, Logout};