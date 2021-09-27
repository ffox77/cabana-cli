import cli from "cli-ux";

class PromptWalletVerify {

  async prompt (name: string) {

    const doVerify = await cli.prompt('Do you want to verify the account(s)?', {default: 'Y'});

    const answer = doVerify.toLowerCase();

    if (answer === 'y' || answer === 'yes') {
      // let numOfAccounts = 1;
      // if (type === 'seed') {
      //   numOfAccounts = Number(await cli.prompt('How many?', {default: '10'})) || 1;
      // }
      // await mazApi.verifyWalletAccounts(name);
    }
  }
}
export const promptWalletVerify = new PromptWalletVerify();
