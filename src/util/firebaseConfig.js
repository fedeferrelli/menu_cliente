
import { collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyB7wSvOGcgq7RrceIAAR6XR1pH6pUyjEW0",
    authDomain: "menu2-c6d89.firebaseapp.com",
    projectId: "menu2-c6d89",
    storageBucket: "menu2-c6d89.appspot.com",
    messagingSenderId: "794818343395",
    appId: "1:794818343395:web:9a57a82b0a7b673d5d70d6"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize FireStore
export const db = getFirestore(app);

// setData function
export const setData = async (data) => {
    try {
        await addDoc(collection(db, 'platos'), data);
        console.log('Ok')
        
      } catch (err) {
        console.error("Ocurrió un error al cargar el plato: ", err);
      
    }
  };


  export const storage = getStorage(app);
 

