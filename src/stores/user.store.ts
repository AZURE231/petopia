import { makeAutoObservable } from 'mobx';
import { ICurrentUserCore } from '../interfaces/user';

export class UserStore {
  userContext: ICurrentUserCore | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUserContext(userContext: ICurrentUserCore) {
    this.userContext = userContext;
  }
}

export const userStore = new UserStore();