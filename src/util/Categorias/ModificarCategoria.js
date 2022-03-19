import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import firebase from "../Firebase/firebaseConfig";

import { Fade } from "react-awesome-reveal";



function ModificarCategorias({setModificarCategoria, infoModificarCategoria}) {

  const {id, nueva_categoria, posicion} = infoModificarCategoria
  
   // validacion y leer datos de formulario
 
   const formik = useFormik({
     initialValues: {
       nueva_categoria: nueva_categoria,
       posicion: posicion,     
     },
 
     validationSchema: Yup.object({
        nueva_categoria: Yup.string()
         .min(3, "Las categorías deben tener al menos 3 caracteres")
         .required("La categoría es obligatoria"),
 
       posicion: Yup.number()
         .min(1, "Debes ingresar un numero")
         .required("La ubicación es obligatorio")
     }),
 
     onSubmit: (categoria) => {
       try {
        
         firebase.db.collection("categorias").doc(id).update(categoria);
         formik.resetForm();
         setModificarCategoria(false)
        
       } catch (error) {
         console.log(error);
       }
       
     },
     
   });
 
 
   
   return (
     <Fade triggerOnce>
       <h1 className="font-bold px-8 pt-6 w-full text-center text-gray-100 tracking-widest bg-gray-800 text-xl">
         {" "}
         Acá podés modificar las{" "}
         <span className="text-2xl block uppercase text-violet-600">
           {" "}
           categorias del menu
         </span>
       </h1>
 
       <div className="flex justify-center pt-12 bg-gray-800 min-h-screen">
         <div className=" w-full max-w-2xl">
           <form
             className="w-full px-4 flex flex-col justify-center items-center"
             onSubmit={formik.handleSubmit}
           >
 
 
             {/* CATEGORIA */}
             <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
               <label
                 className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-widest"
                 htmlFor="nueva_categoria"
               >
                 Categoria a Modificar
               </label>
 
               <input
                 className="w-full bg-gray-100 text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
                 id="nueva_categoria"
                 type="text"
                 placeholder="Nueva categoria"
                 value={formik.values.nueva_categoria}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
             </div>
 
             {formik.touched.nueva_categoria && formik.errors.nueva_categoria ? (
               <div
                 className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                 role="alert"
               >
                 <p className="font-bold"> Hubo un error: </p>
                 <p>{formik.errors.nueva_categoria}</p>
               </div>
             ) : null}
 
             {/* POSICION */}
             <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
               <label
                 className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-widest"
                 htmlFor="posicion"
               >
                 Posicion
               </label>
 
               <input
                 className="w-full bg-gray-100 text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
                 id="posicion"
                 type="float"
                 placeholder="Orden en el menu"
                 min="0"
                 value={formik.values.posicion}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
             </div>
 
             {formik.touched.posicion && formik.errors.posicion ? (
               <div
                 className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                 role="alert"
               >
                 <p className="font-bold"> Hubo un error: </p>
                 <p>{formik.errors.posicion}</p>
               </div>
             ) : null}
 
 
             <input
               type="submit"
               className=" w-full h-12 rounded-sm px-6 py-2 mt-8 bg-green-700 font-bold uppercase text-white hover:bg-green-800 cursor-pointer"
               value="modificar categoría"
             />
 
             <button
               className=" w-full h-12 rounded-sm px-6 py-2 mt-4 bg-red-700 font-bold uppercase text-white hover:bg-red-800 cursor-pointer"
              onClick={() => setModificarCategoria(false)}
             >
               {" "}
               cancelar{" "}
             </button>
           </form>
         </div>
       </div>
     </Fade>
   );
}

export default ModificarCategorias;
