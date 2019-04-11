import React, { Component } from 'react';
import { GetInfo } from '../services/UserApi';

import Context from './auth-context';

class GlobalState extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        isAuth: false ,
        first_name: "",
        last_name: "",
        email: "",
        role: "",
        id: 0,
        updateAuthInfo: this.updateAuthInfo,
      };
    }

    updateAuthInfo = (isAuth, first_name, last_name, email, role, id) => {
      this.setState(() => ({isAuth, first_name, last_name, email, role, id}));
    }

    componentDidMount = async () => {
      await this.fetchUser();
    }

    fetchUser = async () => {
      try{
        const { data } = await GetInfo();
        this.setState(() => ({ 
          isAuth: true, 
          ...data,
        }));
        return data
      }
      catch(e) {
        console.error('Error happens:', e);
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



