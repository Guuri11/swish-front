/* eslint-disable import/no-cycle */
import { action, observable } from 'mobx';

import { Resetable } from '../interfaces/resetable';
import AuthenticationStore from './authentication';

class AppStore implements Resetable {
  @observable authenticationStore!: AuthenticationStore;

  constructor() {
    this.authenticationStore = new AuthenticationStore(this);
  }

  @action
  reset(): void {
    this.authenticationStore.reset();
  }
}

export default AppStore;
