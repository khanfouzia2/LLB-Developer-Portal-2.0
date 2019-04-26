import axios from 'axios';
import {GET_USER_MOBILE_APPS} from '../rest-endpoints';

const GetUserMobileApps = () => {
  return axios.get(GET_USER_MOBILE_APPS,{withCredentials: true});
};

// const FormRegister =  (first_name, last_name, email, password) => {
//   return axios.post(USER_FORM_REGISTER, 
//     {
//       first_name, 
//       last_name, 
//       email, 
//       password
//     }, {withCredentials: true});
//    };

export {GetUserMobileApps};