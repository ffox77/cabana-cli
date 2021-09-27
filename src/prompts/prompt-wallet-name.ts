import * as inquirer from "inquirer";
import {manageApi} from "../apis/manage-api";

class PromptWalletName {

  async prompt () {

    let walletId = '';

    const wallets = await manageApi.getWallets();

    if (wallets && wallets.length) {
      let responses: any = await inquirer.prompt([{
        name: 'wallet',
        message: 'select a wallet',
        type: 'list',
        choices: wallets.map(w => ({name:`${w.label} (${w.id})`, value: w.id})),
      }])
      walletId = responses.wallet;
    }
    else {
      throw new Error('ERROR - No wallets found');
    }

    // const w = wallets.find(w => w.id === walletId);
    //
    if (walletId) {
      return walletId;
    }

    throw new Error('No wallet found - ' + walletId);
  }
}
export const promptWalletName = new PromptWalletName();
