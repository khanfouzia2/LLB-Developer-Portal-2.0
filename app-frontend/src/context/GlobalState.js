import React, { Component } from 'react';
import { GetInfo } from '../services/UserApi';

import Context from './auth-context';

class GlobalState extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        isAuth: false ,
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        updateAuthInfo: this.updateAuthInfo,
      }
      
      this.fetchUser();
    }

    updateAuthInfo = (isAuth, firstName, lastName, email, role) => {
      this.setState(() => ({isAuth, firstName, lastName, email, role}));
      console.log(this.state);
    }

    fetchUser = async () => {
      try{
        const { data } = await GetInfo();
        console.log(data);
        this.setState(() => ({ 
          isAuth: true, 
          firstName: data.first_name, 
          lastName: data.last_name, 
          email: data.email, 
          role: data.role
        }));
      }
      catch(e) {

      }        
    }
    render() {
      return (
        <Context.Provider value={this.state} >
            {this.props.children}
        </Context.Provider>
     )
    }
}

export default GlobalState;



