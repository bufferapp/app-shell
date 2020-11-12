import React, { useContext } from 'react';

export const LOADING_USER = {
  email: '...',
  featureFlips: [],
}
export const User = React.createContext(LOADING_USER)

export const useUser = () => useContext(User)
