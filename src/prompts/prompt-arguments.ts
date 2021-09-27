import * as inquirer from "inquirer";
import {promptWalletCreate} from "./prompt-wallet-create";
import {promptWalletSelect} from "./prompt-wallet-open";
import {promptWalletImport} from "./prompt-wallet-import";

class PromptArguments {

  async prompt () {

    let responses: any = await inquirer.prompt([{
      name: 'action',
      message: 'What would like to do?',
      type: 'list',
      choices: [
        {name: 'open a wallet', value: 'open'},
        {name: 'create a wallet', value: 'create'},
        {name: 'import a wallet', value: 'import'}
      ]
    }])

    const arg = responses.action;

    if (arg === 'create') {
      await promptWalletCreate.prompt();
    }
    else if (arg === 'open') {
      await promptWalletSelect.prompt();
    }
    else if (arg === 'import') {
      await promptWalletImport.prompt();
    }

  }
}
export const promptArguments = new PromptArguments();
