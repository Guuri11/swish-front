/* eslint-disable import/no-cycle */
import { action, makeAutoObservable, observable } from 'mobx';
import AppStore from '..';
import * as types from '../../../types';
import { Resetable } from '../../interfaces/resetable';

class AuthorizationStore implements Resetable {
  appStore!: AppStore;

  @observable user: types.User;

  @observable token: string;

  constructor(app: AppStore) {
    makeAutoObservable(this);
    this.appStore = app;
    this.token = sessionStorage.getItem('token');
  }

  reset(): void {
    this.user = null;
    this.token = null;
  }

  @action async setUser(user: types.User) {
    this.user = user;
  }

  @action async setToken(token: string) {
    this.token = token;
    sessionStorage.setItem('token', token);
  }
}

export default AuthorizationStore;
