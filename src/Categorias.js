
import React, {useState, useEffect} from 'react';

import { useNavigate } from 'react-router';

import firebase from './util/firebaseConfig';



import ModificarCategoria from './ModificarCategoria';

import _ from "lodash";


function Categorias() {


const [datosCategorias, setDatosCategorias] = useState([])
const [filtroCategorias, setFiltroCategorias] = useState('')


const [modificarCategoria, setModificarCategoria] = useState(false)

const [idModificarCategoria, setIdModificarCategoria] = useState('')

const [infoModificarCategoria, setInfoModificarCategoria] = useState({})
 




useEffect(() => {

    const obtenerCategorias = () => {
        firebase.db.collection('categorias').onSnapshot(handleSnapshot); 

     }
     obtenerCategorias();
     
 }, [filtroCategorias]);

// Snapshot permite manejar la base de datos en real time  

 const handleSnapshot = (snapshot) =>{
     const categorias_list = snapshot.docs.map(doc => {
         return {
             id: doc.id,
             ...doc.data()
         }
     });

     const categorias_filtrados = _.filter(categorias_list, categoria => _.includes(_.lowerCase([ categoria.nueva_categoria]), _.lowerCase(filtroCategorias)));
     const categorias_sorteadas = _.sortBy(categorias_filtrados, 'posicion');
     setDatosCategorias(categorias_sorteadas)   
 }


 // hook para redirecionar
 
 const navigate = useNavigate();

// funcion para eliminar categoria
const eliminarCategoria=(id, categoria)=>{

    if(window.confirm(`¿estás seguro que queres eliminar ${categoria}?`) )
        
      { try {
          firebase.db.collection('categorias').doc(id).delete().then(function() {
            // File deleted successfully
              });
      } catch (error) {
          console.log(error)    
      }}       
    }

    const modificarCategoriaFn = (categoria) =>{

        setInfoModificarCategoria(categoria)
        setModificarCategoria(true)
    }

return (
  <>
 {modificarCategoria ? <ModificarCategoria
setModificarCategoria={setModificarCategoria}
infoModificarCategoria={infoModificarCategoria} /> 
: 
    <div className="bg-gray-800 min-h-screen pb-20">
      <h1 className="font-bold px-8 w-full text-center text-white text-xl py-6">
        {" "}
        Acá podés ver y administar{" "}
        <span className="text-2xl block uppercase text-violet-600">
          {" "}
          las categorias
        </span>
      </h1>

      <div className="mb-4 bg-white/75 px-2  sticky top-0 z-50 bg-gray-900">
        <input
          className="shadow italic appearance-none border rounded w-full py-3 px-3 mt-1 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:border-violet-700 focus:shadow-none "
          id="buscar"
          type="text"
          placeholder="Buscar"
          onChange={(e) => setFiltroCategorias(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center w-full">
        {datosCategorias.map((categoria) => (
          <div
            key={Math.random()}
            className="w-full text-gray-700 bg-gray-200 rounded-lg m-2 px-2 py-3 sm:w-1/5 flex flex-row justify-between"
          >
              <div>
                  {categoria.posicion}.{" "}
            <span className="font-bold capitalize">
              {categoria.nueva_categoria}
            </span> </div>

            <div className="flex flex-row">
            <div
              className="px-2 mr-2 h-8 rounded-md text-center flex border border-blue-700 bg-gray-200" onClick={(e)=>{modificarCategoriaFn(categoria)}}
            >
               

              <div className="m-auto"> modificar </div>
            </div>
            <div
              className="px-2 w- h-8 rounded-md  text-center flex border border-red-700 bg-gray-200"
              onClick={() =>
                eliminarCategoria(categoria.id, categoria.nueva_categoria)
              }
            >
              <div className="m-auto">eliminar</div></div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-14 h-14 rounded-full bg-violet-700 fixed bottom-3 right-3 flex justify-center shadow-sm  shadow-gray-500">
        <h1
          className="m-auto text-white text-2xl text-center  align-middle"
          onClick={() => navigate("/addNewCategory")}
        >
          +
        </h1>
      </div>

      <div className="w-32 h-10 rounded-xl bg-yellow-500 fixed bottom-5 left-3 flex justify-center shadow-sm  shadow-gray-500"><h1 className="m-auto text-white text-lg text-center  align-middle"
onClick={()=>navigate('/')}
>Menú</h1></div>

    </div>
}
  </>
);
}

export default Categorias;
