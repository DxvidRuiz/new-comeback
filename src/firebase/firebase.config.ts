/* eslint-disable prettier/prettier */
// firebase.config.ts

import * as admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: 'AIzaSyBNCvJVbdFMrHJTavPHMKD_lDKo5MQggek',
  authDomain: `iimmabe-test.firebaseapp.com`,
  projectId: 'iimmabe-test',
  storageBucket: 'iimmabe-test.appspot.com',
  messagingSenderId: '848484145127',
  appId: '1:848484145127:android:4ba5d04090ab4af2570f42',
};

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: firebaseConfig.storageBucket,
});

export { admin };
