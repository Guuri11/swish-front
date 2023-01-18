/* eslint-disable import/no-cycle */
import { action, makeAutoObservable, observable } from 'mobx';
import AppStore from '..';
import * as types from '../../../types';
import { Resetable } from '../../interfaces/resetable';

class TeamStore implements Resetable {
  appStore!: AppStore;

  @observable teams: types.Team;

  @observable teamsStats: types.TeamStats;

  constructor(app: AppStore) {
    makeAutoObservable(this);
    this.appStore = app;
  }

  reset(): void {
    this.teams = null;
    this.teamsStats = null;
  }

  @action async setTeams(teams: types.Team) {
    this.teams = teams;
  }

  @action async setTeamsStats(teamsStats: types.TeamStats) {
    this.teamsStats = teamsStats;
  }
}

export default TeamStore;
