import firebase from 'firebase';
import { firebaseConfig } from '../config/firebase';

export function getFirebaseService() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const firebaseService = firebase;

  return firebaseService;
}
