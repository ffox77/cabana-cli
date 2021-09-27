import * as inquirer from "inquirer";
import cli from "cli-ux";
import {promptWalletName} from "./prompt-wallet-name";

import {promptWalletVerify} from "./prompt-wallet-verify";
import {cviApi} from "../apis/cvi-api";

class PromptWalletOpen {

  private multiAccountChoices = [
    // {name: 'show addresses', value: 'listAccounts'},
    // {name: 'list balances', value: 'listBalances'},
    {name: 'cvi-status', value: 'cvi-status'},
    {name: 'cvi-claim', value: 'cvi-claim'},
    {name: 'cvi-open', value: 'cvi-open'},
    {name: 'cvi-close', value: 'cvi-close'},
    // {name: 'cvi-onOff', value: 'onOff'}, //TODO - always show the last disabled. If user enables, automatically add another as disabled.
    {name: 'cvi-numOfAccounts', value: 'numOfAccounts'},
    {name: 'disburse:topOff', value: 'topOff'},
    {name: 'exit', value: 'exit'}
  ];

  private currentActions: { name: string, value: string}[] = [];
  private walletId: string;

  async prompt (walletId?: string) {

    if (!walletId) {
      walletId = await promptWalletName.prompt();
    }

    this.walletId = walletId;

    this.currentActions = this.multiAccountChoices;

    this.loop();
  }

  async loop () {

    let responses: any = await inquirer.prompt([{
      name: 'action',
      message: 'choose an action',
      type: 'list',
      choices: this.currentActions
    }])

    const action = responses.action;

   if (action === 'disburse') {
     //TODO - get a list of accounts honoring disabled flag. Show all: address, balance, enabled. If disabled, use gray font-color
      const addressOrIndex: string = await cli.prompt('What is the from address or index?');
      let fromAddress = '';
      if (addressOrIndex.startsWith('0x')) {
        fromAddress = addressOrIndex;
      }
      else {
        const fromIndex = Number(addressOrIndex) - 1;
        // const account = this.wallet.getAccounts()[fromIndex];
        // if (account) {
        //   fromAddress = account.getAddress();
        //   console.log(fromAddress);
        // } else {
        //   throw new Error('No account at index ' + fromIndex);
        // }
      }
      const amount: string = await cli.prompt(`What amount in ETH?`);
      // (this.wallet as MultiAccountWallet).setNumOfAccounts(13);
     // const s = new Sweep();
     //  await s.disburse(this.wallet,fromAddress,parseFloat(amount), { topOff: true, splitEvenly: false });
     //TODO - show dryRun first, user confirms then run again
    }
    else if (action === 'cvi-status') {
      await cviApi.statusQuery(this.walletId);
    }
    else if (action === 'exit') {
      process.exit(1);
    }

    await this.wait(1);

    this.loop();
  }

  private async wait (time = 5): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time * 1000));
  }
}
export const promptWalletSelect = new PromptWalletOpen();
