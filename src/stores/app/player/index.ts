/* eslint-disable import/no-cycle */
import { action, makeAutoObservable, observable } from 'mobx';
import AppStore from '..';
import * as types from '../../../types';
import { Resetable } from '../../interfaces/resetable';

class PlayerStore implements Resetable {
  appStore!: AppStore;

  @observable players: types.Player;

  @observable playersStats: types.PlayerStats;

  constructor(app: AppStore) {
    makeAutoObservable(this);
    this.appStore = app;
  }

  reset(): void {
    this.players = null;
    this.playersStats = null;
  }

  @action async setPlayers(players: types.Player) {
    this.players = players;
  }

  @action async setPlayersStats(playersStats: types.PlayerStats) {
    this.playersStats = playersStats;
  }
}

export default PlayerStore;
