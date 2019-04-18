import axios from 'axios';
import {USER_FORM_REGISTER, USER_LOGIN, USER_LOGOUT,USER_ME, USER_GENERATE_API} from '../rest-endpoints';

const CredentialLogin = (email, password) => {
  return axios.post(USER_LOGIN,
      {
        email,
        password
      },
      {withCredentials: true}
    );
};

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
const UpdateInfo = (first_name, last_name, password) => {
  return axios.put(USER_ME, {first_name, last_name, password}, {withCredentials: true});
}

const GenerateAPIKey = () => {
  return axios.post(USER_GENERATE_API, {} ,{withCredentials: true});
}
const GetAPIKey = () => {
  return axios.get(USER_GENERATE_API,{withCredentials: true});
}
export {CredentialLogin, FormRegister, Logout, GetInfo, UpdateInfo, GenerateAPIKey,GetAPIKey};