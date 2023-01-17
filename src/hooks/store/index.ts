import { useContext } from 'react';

import { AppContext } from '../../context';
import AppStore from '../../stores/app';
import AuthenticationStore from '../../stores/app/authentication';

export const useAppStore = (): AppStore => {
  const context = useContext(AppContext);
  if (context === null) {
    console.log('Use the hook inside AppProvider');
  }
  return context;
};

export const useAuthenticationStore = (): AuthenticationStore => {
  const store = useAppStore();
  return store.authenticationStore;
};
