import { createContext, useContext } from 'react';
import { userStore } from './user.store';

const stores = {
  userStore
};

export const useStores = () => useContext(createContext(stores));