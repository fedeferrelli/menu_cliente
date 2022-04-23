import React, {useState, useEffect} from 'react';

import { useNavigate } from 'react-router';

import firebase from '../../util/Firebase/firebaseConfig';

import {AiOutlinePlus} from 'react-icons/ai'

import ShowDish from '../../util/Platos/ShowDish';

import ModificarPlato from '../../util/Platos/ModificarPlato';

import _ from "lodash";
import {Fade} from 'react-awesome-reveal'

function Dishes() {

const [datos, setDatos] = useState([])
const [filtro, setFiltro] = useState('')

const [categoriasOrdenadas, setCategoriasOrdenadas] = useState([])




const [modificar, setModificar] = useState(false)

const [idModificar, setIdModificar] = useState('')

const [infoModificar, setInfoModificar] = useState({})

// obtener datos de categorias

useEffect(() => {

    const obtenerCategorias = () => {
        firebase.db.collection('categorias').onSnapshot(handleSnapshotCategorias); 

     }
     obtenerCategorias();
     
 }, []);

 const handleSnapshotCategorias = (snapshot) =>{
  const categorias_list = snapshot.docs.map(doc => {
      return {
          id: doc.id,
          ...doc.data()
      }
  });

      const categorias_sorteadas = _.sortBy(categorias_list, 'posicion');
      
      const categoriasOrdenadasAux = [];
      
      categorias_sorteadas.map(cat=>(
        categoriasOrdenadasAux.push(cat.nueva_categoria)
      ))
      
      setCategoriasOrdenadas(categoriasOrdenadasAux)
     
     
}


// Snapshot permite manejar la base de datos en real time  

 const handleSnapshot = (snapshot) =>{
     const dishes_list = snapshot.docs.map(doc => {
         return {
             id: doc.id,
             ...doc.data()
         }
     });

     const platos_filtrados = _.filter(dishes_list, dish => _.includes(_.lowerCase([ dish.categoria, dish.plato, dish.descripcion, dish.tags, dish.precio]), _.lowerCase(filtro)));
     const platos_sorteados =_.sortBy(platos_filtrados, function(obj){ 
        return _.indexOf(categoriasOrdenadas, obj.categoria);
    });
     setDatos(platos_sorteados)  
    }

    useEffect(() => {

        const obtenerPlato = () => {
            firebase.db.collection('platos').onSnapshot(handleSnapshot); 
    
         }
         obtenerPlato();
         
     }, [filtro, categoriasOrdenadas]);

 

 const MostrarCategoria = (categoria, i) => {

    if(i>0){
    const categoriaAnterior =_.lowerCase(datos[i-1].categoria)

    if(categoriaAnterior!==_.lowerCase(categoria)){
        return(
            <div className="text-gray-200 bg-violet-600 font-bold font-sans text-2xl text-center block w-full capitalize rounded-md py-2 mt-1 z-50" >{categoria} </div>
        )
    }
else return
}
    else{
        return(
            <div className="text-gray-200 bg-violet-600 font-bold font-sans text-2xl text-center block capitalize rounded-md py-2 z-50" >{categoria} </div>

        )
    }
}

 // hook para redirecionar
 
 const navigate = useNavigate();




return (


<div className="w-full">
<Fade>

{modificar ? <ModificarPlato
setModificar={setModificar}
modificar={modificar}
idModificar={idModificar}
infoModificar={infoModificar}/> 
: 
<Fade>
< div className="bg-gray-800 min-h-screen pb-20 sm:pb-16">
<h1 className="font-bold px-8 w-full text-center text-white text-xl py-6">
        {" "}
        Acá podés ver{" "}
        <span className="text-2xl block uppercase text-violet-600">
          {" "}
          el menú
        </span>
      </h1>

        <div className="mb-4 sticky pb-2 top-0 z-50 bg-gray-800 flex">


    

        <input className="shadow italic appearance-none border rounded w-full py-3 px-3 m-auto text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:border-violet-700 focus:shadow-none "
        id="buscar"
        type="text"
        placeholder="Buscar"

        onChange={e => setFiltro(e.target.value)} 
        
        />

    </div>

        <div className="flex w-full flex-col  bg-gray-800">
         {datos.map((dish,i) =>(
         <div key={Math.random()} >   
          <div className="sticky top-14">
          
          { MostrarCategoria(dish.categoria, i)}
           </div>

           <div className="w-full">
          <ShowDish
          dish={dish}
          setModificar={setModificar}
          modificar={modificar}
          setIdModificar={setIdModificar}
          setInfoModificar={setInfoModificar}
          />
          </div>
          </div>
         ))}
        </div>

<div className="w-14 h-14 rounded-full bg-violet-700 fixed bottom-3 right-3 sm:right-48 flex justify-center shadow-sm shadow-gray-500 cursor-pointer" onClick={()=>navigate('/addDish')}><h1 className="m-auto text-white text-2xl text-center  align-middle"

><AiOutlinePlus/></h1></div>


<div className="w-32 h-14 rounded-xl bg-yellow-500 fixed bottom-3 left-3 sm:left-48 flex justify-center shadow-sm px-4 shadow-gray-500 cursor-pointer" onClick={()=>navigate('/categories')}><h1 className="m-auto text-white text-lg text-center  align-middle"

>Categorías</h1></div>



</div>
</Fade>


}
      </Fade>  
      </div>
    )
}

export default Dishes;
