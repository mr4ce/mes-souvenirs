import { NetworkStatus, Plugins } from '@capacitor/core';
import { action, makeObservable, observable } from 'mobx';

const { Network } = Plugins;

class ApplicationStore {
  public isOnline: boolean = true;

  public connectionStatus: Maybe<NetworkStatus> = null;

  constructor() {
    makeObservable(this, {
      isOnline: observable,
      connectionStatus: observable,

      setConnectionStatus: action.bound,
    });

    Network.addListener('networkStatusChange', this.setConnectionStatus);
  }

  public async init() {
    this.setConnectionStatus(await Network.getStatus());
  }

  public setConnectionStatus(connectionStatus: Maybe<NetworkStatus>) {
    this.isOnline = connectionStatus.connected;

    this.connectionStatus = connectionStatus;
  }
}

export default ApplicationStore;
