import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyANfoqbMTaM-cVwWPzajNTRsEEOHn3F7p4',
  authDomain: 'davids-place-portfolio.firebaseapp.com',
  projectId: 'davids-place-portfolio',
  storageBucket: 'davids-place-portfolio.firebasestorage.app',
  messagingSenderId: '800704161242',
  appId: '1:800704161242:web:77d6325f4d3568ddf9cce3',
  measurementId: 'G-CTLCX47Q87',
};

export const app = initializeApp(firebaseConfig);
