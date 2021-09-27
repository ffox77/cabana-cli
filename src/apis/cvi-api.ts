import {mazDi} from "@mazarine-sea/maz-core";
import process from "process";
import {loginApi} from "./login-api";

class CviApi {
  private _service = mazDi.createRestApi(process.env.SERVER_URL);
  private initialized: Boolean;

  statusQuery (id: string) {
    return this.service.$post('/cvi/status/' + id);
  }

  private get service() {
    if (!this.initialized) {
      this._service.configure().authToken(loginApi.getToken());
      this.initialized = true;
    }
    return this._service;
  }


}

export const cviApi = new CviApi();
