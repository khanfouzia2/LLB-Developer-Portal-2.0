import { createContext } from 'react';

const state = { 
  isAuth: false,
  first_name: "",
  last_name: "",
  email: "",
  role: "",
  updateAuthInfo: (isAuth, first_name, last_name, email, role) => {},
};
export default createContext(state);