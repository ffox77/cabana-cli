require('dotenv').config();

import {promptArguments} from "./prompts/prompt-arguments";
import {loginApi} from "./apis/login-api";
import {firebaseClient, FirebaseClient} from "./utils/firebase-client";

import {Command, flags} from '@oclif/command'
const { LocalStorage } = require('node-localstorage');
import {mazDi} from "@mazarine-sea/maz-core";

const fetch = require("node-fetch");
mazDi.useFetchHttpClient(fetch);
mazDi.registerStorageClient(new LocalStorage('/tmp/db-store'));

class CabanaCli extends Command {
  static description = 'Get out of the sun and manage a crypto wallet'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  async run() {
    FirebaseClient.initialize();

    this.parse(CabanaCli);

    await loginApi.getOrCreateTokenId(true);

    firebaseClient.observeLogs();

    // open last [CVI Cabana #1]
    // open wallet
    // create wallet
    await promptArguments.prompt();
  }


}

export = CabanaCli
