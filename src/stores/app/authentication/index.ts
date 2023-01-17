/* eslint-disable import/no-cycle */
import { action, makeAutoObservable, observable } from 'mobx';
import AppStore from '..';
import * as types from '../../../types';
import { Resetable } from '../../interfaces/resetable';

class AuthorizationStore implements Resetable {
  appStore!: AppStore;

  @observable user: types.User;

  constructor(app: AppStore) {
    makeAutoObservable(this);
    this.appStore = app;
  }

  reset(): void {
    this.user = null;
  }

  @action async setUser(user: types.User) {
    this.user = user;
  }
}

export default AuthorizationStore;
