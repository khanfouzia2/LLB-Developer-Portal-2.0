import axios from 'axios';
import {USER_FORM_REGISTER, USER_LOGIN, USER_LOGOUT,USER_ME} from '../rest-endpoints';

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

const FormRegister =  (first_name, last_name, email, password) => {
  return axios.post(USER_FORM_REGISTER, 
    {
      first_name, 
      last_name, 
      email, 
      password
    }, {withCredentials: true});
   };

const Logout =  () => {
     return axios.get(USER_LOGOUT, {withCredentials: true});
  }

const GetInfo = () => {
  return axios.get(USER_ME, {withCredentials: true});
}
export {CredentialLogin, GmailLogin, FormRegister, Logout, GetInfo};