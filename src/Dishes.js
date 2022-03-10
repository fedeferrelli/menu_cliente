import React, {useState, useEffect} from 'react';
import { getData, db } from './util/firebaseConfig';
import { getFirestore, doc, onSnapshot, getDoc, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { FirebaseError } from 'firebase/app';

import ShowDish from './ShowDish';

function Dishes() {

const [datos, setdatos] = useState([])

useEffect(() => {
    const getData = async()=>{
       


        const querySnapshot = await getDocs(collection(db, "platos"));


setdatos(querySnapshot.docs.map(doc=>doc.data()))
      };
           getData()
}, [])
  

    return (
        <div className="flex flex-wrap justify-center">
         {datos.map(dish =>(
            
          <ShowDish key={dish.url} dish={dish}/>
         
         ))}
        </div>
    )
}

export default Dishes;
