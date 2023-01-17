/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import { action } from 'mobx';

import { Resetable } from '../interfaces/resetable';

class AppStore implements Resetable {
  @action
  reset(): void {
  }
}

export default AppStore;
