import React, {useState, useEffect} from 'react';

import { useNavigate } from 'react-router';

import firebase from './util/firebaseConfig';

import ShowDish from './ShowDish';

import ModificarPlato from './ModificarPlato';

import _ from "lodash";

function Dishes() {

const [datos, setDatos] = useState([])
const [filtro, setFiltro] = useState('')






const [modificar, setModificar] = useState(false)

const [idModificar, setIdModificar] = useState('')

const [infoModificar, setInfoModificar] = useState({})





useEffect(() => {

    const obtenerPlato = () => {
        firebase.db.collection('platos').onSnapshot(handleSnapshot); 

     }
     obtenerPlato();
     
 }, [filtro]);

// Snapshot permite manejar la base de datos en real time  

 const handleSnapshot = (snapshot) =>{
     const dishes_list = snapshot.docs.map(doc => {
         return {
             id: doc.id,
             ...doc.data()
         }
     });

     const platos_filtrados = _.filter(dishes_list, dish => _.includes(_.lowerCase([ dish.categoria, dish.plato, dish.descripcion, dish.tags, dish.precio]), _.lowerCase(filtro)));
     const platos_sorteados = _.sortBy(platos_filtrados, 'categoria', 'plato');
     setDatos(platos_sorteados)

     
 }


 const MostrarCategoria = (categoria, i) => {

    if(i>0){
    const categoriaAnterior =_.lowerCase(datos[i-1].categoria)

    if(categoriaAnterior!==_.lowerCase(categoria)){
        return(
            <h1 className="text-violet-700 font-bold font-sans text-2xl text-left mt-10 mb-1 border-t border-violet-700 capitalize" >{categoria} </h1>
        )
    }
else return
}
    else{
        return(
            <h1 className="text-violet-700 font-bold font-sans text-2xl text-left  mt-2 mb-1 capitalize" >{categoria} </h1>

        )
    }
}

 // hook para redirecionar
 
 const navigate = useNavigate();




return (



<>

{modificar ? <ModificarPlato
setModificar={setModificar}
modificar={modificar}
idModificar={idModificar}
infoModificar={infoModificar}/> 
: 
<>
<h1 className="font-bold px-8 w-full text-center text-gray-700 text-xl">
        {" "}
        Acá podés ver{" "}
        <span className="text-2xl block uppercase text-violet-600">
          {" "}
          el menú
        </span>
      </h1>

        <div className="mb-4 bg-white/75 px-2  sticky top-0">


    

        <input className="shadow italic appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:border-violet-700 focus:shadow-none "
        id="buscar"
        type="text"
        placeholder="Buscar"

        onChange={e => setFiltro(e.target.value)} 
        
        />

    </div>

        <div className="flex flex-wrap justify-center w-full">
         {datos.map((dish,i) =>(
         <div key={Math.random()} className="w-full px-2 sm:w-1/5">   
          <div className="sticky top-10">
          
          { MostrarCategoria(dish.categoria, i)}
           </div>
          <ShowDish  
          dish={dish}
          setModificar={setModificar}
          modificar={modificar}
          setIdModificar={setIdModificar}
          setInfoModificar={setInfoModificar}
          />
          </div>
         ))}
        </div>

<div className="w-12 h-12 rounded-full bg-violet-700 fixed bottom-3 right-3 flex justify-center shadow-2xl shadow-black"><h1 className="m-auto text-white text-2xl text-center  align-middle"
onClick={()=>navigate('/addDish')}
>+</h1></div>
</>
}
      </>  
    )
}

export default Dishes;
