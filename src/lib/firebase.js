import { initializeApp, getApps } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "shahid-86757",
  appId: "1:855287046029:web:c3de96a05d51a0dd9127c4",
  databaseURL: "https://shahid-86757.firebaseio.com",
  storageBucket: "shahid-86757.firebasestorage.app",
  locationId: "us-central",
  apiKey: "AIzaSyB8GG9N28eWg8-t5u-cii6BLHwyYfUKTig",
  authDomain: "shahid-86757.firebaseapp.com",
  messagingSenderId: "855287046029",
  projectNumber: "855287046029"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let db;
try {
  db = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  });
} catch (e) {
  db = getFirestore(app);
}

const auth = getAuth(app);

export { db, auth };
