import { makeAutoObservable } from 'mobx';
import { ICurrentUserCoreResponse } from '../interfaces/user';

export class UserStore {
  userContext: ICurrentUserCoreResponse | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUserContext(userContext: ICurrentUserCoreResponse) {
    this.userContext = userContext;
  }
}

export const userStore = new UserStore();