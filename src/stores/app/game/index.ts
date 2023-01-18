/* eslint-disable import/no-cycle */
import { action, makeAutoObservable, observable } from 'mobx';
import AppStore from '..';
import * as types from '../../../types';
import { Resetable } from '../../interfaces/resetable';

class GameStore implements Resetable {
  appStore!: AppStore;

  @observable games: types.Game;

  constructor(app: AppStore) {
    makeAutoObservable(this);
    this.appStore = app;
  }

  reset(): void {
    this.games = null;
  }

  @action async setGames(games: types.Game) {
    this.games = games;
  }
}

export default GameStore;
