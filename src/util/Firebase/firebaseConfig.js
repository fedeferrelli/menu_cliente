import app from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyB7wSvOGcgq7RrceIAAR6XR1pH6pUyjEW0",
    authDomain: "menu2-c6d89.firebaseapp.com",
    projectId: "menu2-c6d89",
    storageBucket: "menu2-c6d89.appspot.com",
    messagingSenderId: "794818343395",
    appId: "1:794818343395:web:9a57a82b0a7b673d5d70d6"
  };


  
  class Firebase{
  
  
      constructor(){
  
          app.initializeApp(firebaseConfig)  
          this.db = app.firestore()
          this.storage=app.storage()
      
      }
  
     
  }
  
  const firebase = new Firebase();
  
  export default firebase;