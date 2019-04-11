import { createContext } from 'react';

const state = { 
  isAuth: false,
  first_name: "",
  last_name: "",
  email: "",
  role: "",
  updateAuthInfo: (isAuth, first_name, last_name, email, role) => {},
  id: 0,
};
export default createContext(state);