
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onChildAdded } from "firebase/database";
import firebase from "firebase/compat";
import functions = firebase.functions;



const firebaseConfig = {
  apiKey: "AIzaSyDTEt6ITGHvpyIzMdI5I9xUtZMP84i1VuM",
  authDomain: "coin-cabana.firebaseapp.com",
  databaseURL: "https://coin-cabana-default-rtdb.firebaseio.com",
  projectId: "coin-cabana",
  appId: "1:998341296655:web:0dad7baf1f36aeb1a3197a"
};

export class FirebaseClient {

  private logPath = '/app/cvi/AAA1/logs';
  private observingLogs: boolean
  private logUnsubscribe: Function;

  static initialize() {
    initializeApp(firebaseConfig);
  }

  observeLogs() {
    if(this.observingLogs) {
      return;
    }

    this.observingLogs = true;

    const db = getDatabase();

    const logRef = ref(db, this.logPath);

    this.logUnsubscribe = onChildAdded(logRef, data => {
      console.log(data.val());
    });

    console.log('observing', this.logUnsubscribe)

  }

  stopObservingLogs() {
    this.logUnsubscribe();
    this.observingLogs = false;
  }
}

export const firebaseClient = new FirebaseClient();
