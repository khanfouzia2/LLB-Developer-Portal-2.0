import React, {Component,createContext} from 'react';
import {USER_FORM_REGISTER, USER_LOGIN, USER_LOGOUT} from '../rest-endpoints';
import {GetInfo} from '../services/UserApi';

const AuthContext = createContext();

class AuthProvider extends Component {
    state = { isAuth: false ,
              firstName: "",
              lastName: "",
              email: "",
              role: "",
            }

    updateAuthInfo = (isAuth, firstName, lastName, email, role) => {
      this.setState({isAuth, firstName, lastName, email, role});
      console.log(this.state);
    }
    async componentDidMount() {
      try{
        let result = await GetInfo();
        console.log(result)
        this.setState(
          { isAuth: true, 
            firstName: result.data.first_name, 
            lastName: result.data.last_name, 
            email: result.data.email, 
            role: result.data.role}
        );
      }
      catch(e) {

      }        
    }
    render() {
      return (
        <AuthContext.Provider value = {
              {
                userInfo:this.state,
                updateAuthInfo: this.updateAuthInfo
              }}>
            {this.props.children}
        </AuthContext.Provider>
     )
    }
}
const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer }



