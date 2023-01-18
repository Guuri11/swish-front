import { useContext } from 'react';

import { AppContext } from '../../context';
import AppStore from '../../stores/app';
import AuthenticationStore from '../../stores/app/authentication';
import GameStore from '../../stores/app/game';
import PlayerStore from '../../stores/app/player';
import TeamStore from '../../stores/app/teams';

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

export const useTeam = (): TeamStore => {
  const store = useAppStore();
  return store.teamStore;
};

export const usePlayer = (): PlayerStore => {
  const store = useAppStore();
  return store.playerStore;
};

export const useGame = (): GameStore => {
  const store = useAppStore();
  return store.gameStore;
};
