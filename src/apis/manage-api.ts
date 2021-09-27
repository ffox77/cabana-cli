import {mazDi} from "@mazarine-sea/maz-core";
import process from "process";
import {loginApi} from "./login-api";

type WalletInfo = {
  id: string;
  label: string;
}

type EncryptedJson = {
  id: string;
  salt: string;
  value: string;
}

class ManageApi {
  private _service = mazDi.createRestApi(process.env.SERVER_URL);
  private initialized: Boolean;

  async getWallets () {
    const results = await this.service.$get<{wallets: WalletInfo[]}>('/wallets');
    return results.wallets;
  }

  cviStatusQuery (id: string) {
    return this.service.$post<EncryptedJson>('/cvi/status/' + id);
  }

  createWallet (name: string, wordCount, numOfAccounts) {
    return this.service.$post<EncryptedJson>('/create/' + name, {type:'MAW', wordCount, numOfAccounts});
  }

  importWallet(name: string, numOfAccounts: number, secret: string) {
    return this.service.$post<EncryptedJson>('/create/' + name, {type:'MAW', numOfAccounts, secret});
  }

  private get service() {
    if (!this.initialized) {
      this._service.configure().authToken(loginApi.getToken());
      this.initialized = true;
    }
    return this._service;
  }


}

export const manageApi = new ManageApi();
