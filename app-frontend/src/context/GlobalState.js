import React, { Component } from 'react';
import { GetInfo } from '../services/UserApi';

import Context from './auth-context';

class GlobalState extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isReady: false,
        isAuth: false ,
        first_name: "",
        last_name: "",
        email: "",
        role: "",
        is_single_sign_on: false,
        is_finished_survey: false,
        id: 0,
        updateAuthInfo: this.updateAuthInfo,
      };
    }

    updateAuthInfo = (isAuth, first_name, last_name, email, role, id, is_finished_survey, is_single_sign_on) => {
      this.setState(() => ({isAuth, first_name, last_name, email, role, id, is_finished_survey, is_single_sign_on}));
    }

    componentDidMount = async () => {
      await this.fetchUser();
      this.setState({isReady: true});
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
          {this.state.isReady ? this.props.children : 'Loading'}
        </Context.Provider>
     )
    }
}

export default GlobalState;



