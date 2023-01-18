/* eslint-disable import/no-cycle */
import { action, observable } from 'mobx';

import { Resetable } from '../interfaces/resetable';
import AuthenticationStore from './authentication';
import TeamStatsStore from './teams';
import PlayerStore from './player';
import GameStore from './game';

class AppStore implements Resetable {
  @observable authenticationStore!: AuthenticationStore;

  @observable teamStore!: TeamStatsStore;

  @observable playerStore!: PlayerStore;

  @observable gameStore!: GameStore;

  constructor() {
    this.authenticationStore = new AuthenticationStore(this);
    this.teamStore = new TeamStatsStore(this);
    this.playerStore = new PlayerStore(this);
    this.gameStore = new GameStore(this);
  }

  @action
  reset(): void {
    this.authenticationStore.reset();
    this.teamStore.reset();
    this.playerStore.reset();
    this.gameStore.reset();
  }
}

export default AppStore;
