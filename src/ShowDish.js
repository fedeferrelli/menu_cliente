import React from "react";
import firebase from './util/firebaseConfig'; 

function ShowDish({ dish, setModificar, modificar, setIdModificar, setInfoModificar }) {
  const { image, plato, descripcion, precio, id } = dish;

// funcion para eliminar plato
  const eliminarPlato=(id)=>{

    if(window.confirm(`¿estás seguro que queres elminar ${plato}?`) )
        
      { try {
          firebase.db.collection('platos').doc(id).delete().then(function() {
            // File deleted successfully
              });
      } catch (error) {
          console.log(error)    
      }}       
    }

     // funcion para modificar plato
const modificarPlato = (id) => {
  setModificar(!modificar)
  setIdModificar(id)
  setInfoModificar({dish})
     
  } 


  return (
    <div className="w-full sm:w-full   sm:h-96 flex flex-col sm:flex-col overflow-hidden my-4 mx-0 box-border rounded-md shadow-lg border border-gray-400 bg-gray-100">
     
     <div  className="w-full sm:w-full  flex flex-row sm:flex-col overflow-hidden box-border ">
      <img
        src={image}
        className="min-w-28 sm:w-40 h-28 sm:h-40 p-1 rounded-md  "
        alt="plato_img"
      />

      <div className="w-3/4 sm:w-full h-full p-1">
        
        <div className="text-xl text-gray-700 font-bold capitalize">{plato}</div>

        <div className="flex  text-gray-500">{descripcion.length < 37 ? descripcion : `${descripcion.slice(0, 37)}...`}  </div>
      </div>

      <div className=" h-full w-1/4 sm:w-full  p-1 flex flex-col justify-between items-center">

      <div className="text-xl font-bold text-gray-700">${precio}</div>

      </div>
      
      </div>

      <div className="flex flex-row justify-evenly py-2 text-grey-500">
      <div className="w-1/4 h-8 rounded-md text-center flex border border-green-700 bg-gray-200" ><div className="m-auto">Stock</div></div>
      <div className="w-1/4 h-8 rounded-md text-center flex border border-blue-700 bg-gray-200" onClick={()=>modificarPlato(id)}><div className="m-auto"> modificar </div></div>
      <div className="w-1/4 w- h-8 rounded-md  text-center flex border border-red-700 bg-gray-200" onClick={()=>eliminarPlato(id)}><div className="m-auto">eliminar</div></div>
     
      </div>
    </div>
  );
}

export default ShowDish;
