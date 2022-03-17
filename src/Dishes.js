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
            <div className="text-white bg-violet-600 font-bold font-sans text-2xl text-center  capitalize rounded-md py-2 mt-1 z-50" >{categoria} </div>
        )
    }
else return
}
    else{
        return(
            <div className="text-white bg-violet-600 font-bold font-sans text-2xl text-center  capitalize rounded-md py-2 z-50" >{categoria} </div>

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
< div className="bg-gray-800 min-h-screen pb-16">
<h1 className="font-bold px-8 w-full text-center text-white text-xl py-6">
        {" "}
        Acá podés ver{" "}
        <span className="text-2xl block uppercase text-violet-600">
          {" "}
          el menú
        </span>
      </h1>

        <div className="mb-4 bg-white/75 px-2  sticky top-0 z-50 bg-gray-900">


    

        <input className="shadow italic appearance-none border rounded w-full py-3 px-3 mt-1 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:border-violet-700 focus:shadow-none "
        id="buscar"
        type="text"
        placeholder="Buscar"

        onChange={e => setFiltro(e.target.value)} 
        
        />

    </div>

        <div className="flex flex-wrap justify-center w-full">
         {datos.map((dish,i) =>(
         <div key={Math.random()} className="w-full px-2 sm:w-1/5">   
          <div className="sticky top-14">
          
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

<div className="w-14 h-14 rounded-full bg-violet-700 fixed bottom-3 right-3 flex justify-center shadow-lg shadow-gray-500"><h1 className="m-auto text-white text-2xl text-center  align-middle"
onClick={()=>navigate('/addDish')}
>+</h1></div>
</div>
}
      </>  
    )
}

export default Dishes;
