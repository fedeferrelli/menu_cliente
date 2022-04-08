import React from "react";
import firebase from '../Firebase/firebaseConfig'; 

function ShowDish({ dish, setModificar, modificar, setIdModificar, setInfoModificar }) {
  const { image, plato, descripcion, precio, id } = dish;

// funcion para eliminar plato
  const eliminarPlato=(id)=>{

    if(window.confirm(`¿estás seguro que queres eliminar ${plato}?`) )
        
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


  const cambiarStock = (id, dish) => {
    if (dish.existencia === "si") {
      dish.existencia = "no";
    } else {
      dish.existencia = "si";
    }

    try {
      firebase.db.collection("platos").doc(id).update(dish);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={ dish.existencia === 'si' ? 
    "w-full  flex flex-col  my-1 rounded-md shadow-lg border border-gray-400 bg-gray-300" 
     : 
    "w-full  flex flex-col  my-1 rounded-md shadow-lg border border-gray-400 bg-red-200 "} >
  
     <div  className="w-full flex flex-row ">



      <img
        src={image}
        className="min-w-28 h-28 p-1 rounded-md  "
        alt="plato_img"
      />

      <div className="w-3/4 h-full p-1">
        
        <div className="text-xl text-gray-700 font-bold capitalize">{plato}</div>

        <div className="flex  text-gray-500">{descripcion.length < 37 ? descripcion : `${descripcion.slice(0, 37)}...`}  </div>
      </div>

      <div className=" h-full w-1/4 p-1 flex flex-col justify-between items-center">

      <div className="text-xl font-bold text-gray-700">${precio}</div>

      </div>
      
      </div>

      <div className="flex flex-row justify-evenly py-2 text-grey-500">
      <div className=
      { dish.existencia==='si' ?
      "w-1/4 h-8 rounded-md text-center flex border text-gray-600 border-green-500 cursor-pointer"
    :
    "w-1/4 h-8 rounded-md text-center text-white flex border border-red-700 bg-red-500 cursor-pointer"
  }
      onClick={()=>cambiarStock(id, dish)} ><div className="m-auto">{dish.existencia==='si' ? 'En Stock' : 'Sin Stock'}</div></div>
      <div className="w-1/4 h-8 rounded-md text-center flex border text-gray-600 border-blue-500 cursor-pointer" onClick={()=>modificarPlato(id)}><div className="m-auto"> Modificar </div></div>
      <div className="w-1/4 w- h-8 rounded-md  text-center flex border text-gray-600 border-red-500 cursor-pointer" onClick={()=>eliminarPlato(id)}><div className="m-auto">Eliminar</div></div>
     
      </div>


      
    </div>
  );
}

export default ShowDish;
