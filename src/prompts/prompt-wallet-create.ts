import * as inquirer from "inquirer";
import cli from "cli-ux";
import {promptWalletVerify} from "./prompt-wallet-verify";
import {manageApi} from "../apis/manage-api";
import {appEnv} from "../app-env";

class PromptWalletCreate {

  async prompt () {
    const name = await cli.prompt('Name your new wallet');

    let wordCount: any = 0;
    let numOfAccounts = 0;

    let responses = await inquirer.prompt([{
      name: 'wordCount',
      message: 'how many words?',
      type: 'list',
      choices: [{name: '12'}, { name: '15'}, {name: '18'}, { name: '21'}, {name: '24'}],
    }])

    wordCount = Number(responses.wordCount);



    numOfAccounts = Number(await cli.prompt('How many accounts?', {default: '10'})) || 1;

    const json = await manageApi.createWallet(name, wordCount, numOfAccounts);

    console.log(appEnv.DIVIDER);
    console.log(JSON.stringify(json,null,2));
    console.log(appEnv.DIVIDER);

    await promptWalletVerify.prompt(name);
  }

}
export const promptWalletCreate = new PromptWalletCreate();
