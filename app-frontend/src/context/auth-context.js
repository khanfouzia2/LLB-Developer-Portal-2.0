import { createContext } from 'react';

const state = { 
  isAuth: false,
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  updateAuthInfo: (isAuth, firstName, lastName, email, role) => {},
};
export default createContext(state);