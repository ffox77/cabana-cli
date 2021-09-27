import {mazDi} from "@mazarine-sea/maz-core";
import {ecsign, bufferToHex, hashPersonalMessage, privateToAddress, toChecksumAddress, toRpcSig} from "ethereumjs-util";
import {getAuth, signInWithCustomToken} from "firebase/auth";
import * as process from "process";

class LoginApi {

  private service = mazDi.createRestApi(process.env.SERVER_URL);
  private token: string;

  getToken () {
    return this.token;
  }

  async getOrCreateTokenId (forceRefresh?: boolean) {
    if (!this.token || forceRefresh) {
      const statement = 'Authorization - ' + Date.now();
      const { token, address } = this.signMessage(statement);
      console.log('login',token, address)
      const result = await this.service.$post<{tokenId: string}>('/login', { statement, token, address});
      this.token = await this.firebaseUserLogin(result.tokenId);
    }
    return this.token;
  }

  private firebaseUserLogin(customToken) {
    return signInWithCustomToken(getAuth(), customToken)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const idToken = await user.getIdToken(true);
        console.log('user', user.displayName, user.isAnonymous, idToken);
        return idToken;
      })
      // .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   console.log('error', errorCode, errorMessage)
      // });
  }

  private signMessage(msg: string) {
    const privateKeyHex = process.env.privateKey;
    const privateKey = Buffer.from(privateKeyHex, 'hex');
    const msgHash = hashPersonalMessage(Buffer.from(msg));
    const address = toChecksumAddress(bufferToHex(privateToAddress(privateKey)));

    const { v, r, s } = ecsign(msgHash, privateKey);
    const sig = this.remove0x(toRpcSig(v, r, s));

    return { token: sig, address };
  }

  private remove0x(hash: string) {
    return hash.startsWith('0x') ? hash.slice(2) : hash;
  }
}

export const loginApi = new LoginApi();
