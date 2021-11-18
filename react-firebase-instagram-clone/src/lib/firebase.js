import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// here I want to import the seed file
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyDiniBFNIdIkA-D5PfzYw9ItKIaCQzzvyM',
  authDomain: 'instagram-yt-b8bc8.firebaseapp.com',
  projectId: 'instagram-yt-b8bc8',
  storageBucket: 'instagram-yt-b8bc8.appspot.com',
  messagingSenderId: '269750759657',
  appId: '1:269750759657:web:601c73765f4cff3e47c078'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here is where I want to call the seed file (only ONCE!)
// seedDatabase(firebase);

export { firebase, FieldValue };
