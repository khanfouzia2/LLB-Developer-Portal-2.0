import axios from 'axios';
import {USER_FORM_REGISTER, USER_LOGIN, USER_LOGOUT} from '../rest-endpoints';

class UserAPI {
   CredentialLogin = async (email, password) => {
      let user = await axios.post(USER_LOGIN,
        {
          email,
          password
        }
      );
   }

   gmailLogin = () => {}

   FormRegister = async (first_name, last_name, email, password) => {
      let user = await axios.post(USER_FORM_REGISTER, 
        {
            first_name, 
            last_name, 
            email, 
            password
        });
   }

   Logout = async () => {
     let result = await axios.get(USER_LOGOUT);
   }
}

export default UserAPI