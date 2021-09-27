import cli from "cli-ux";
import {promptWalletVerify} from "./prompt-wallet-verify";
import {manageApi} from "../apis/manage-api";
import {appEnv} from "../app-env";

class PromptWalletImport {

  async prompt () {
    const name = await cli.prompt('Name your wallet');
    const secret = await cli.prompt('Enter the seed', { type: 'mask'});

    //TODO - discover accounts

    const numOfAccounts = Number(await cli.prompt('How many accounts?', {default: '10'})) || 1;

    const json = await manageApi.importWallet(name, numOfAccounts, secret);

    console.log(appEnv.DIVIDER);
    console.log(JSON.stringify(json,null,2));
    console.log(appEnv.DIVIDER);

    await promptWalletVerify.prompt(name);
  }
}
export const promptWalletImport = new PromptWalletImport();
