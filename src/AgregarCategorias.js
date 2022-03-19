import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import firebase from "./util/firebaseConfig";
import { useNavigate } from 'react-router-dom';



function AgregarCategorias() {

  
 
   // hook para redireccionar
 
 const navigate = useNavigate();
 
   // validacion y leer datos de formulario
 
   const formik = useFormik({
     initialValues: {
       nueva_categoria: "",
       posicion: "",     
     },
 
     validationSchema: Yup.object({
        nueva_categoria: Yup.string()
         .min(3, "Las categorías deben tener al menos 3 caracteres")
         .required("La categoría es obligatoria"),
 
       posicion: Yup.number()
         .min(1, "Debes ingresar un numero")
         .required("La ubicación es obligatorio")
     }),
 
     onSubmit: async (categoria) => {
       try {
        
         await firebase.db.collection("categorias").add(categoria);
         formik.resetForm();
        
       } catch (error) {
         console.log(error);
       }
    navigate('/categories');
     },
   });
 
 
   // hook para redirecionar
  /*  const navigate  = useNavigate();
  */
   return (
     <>
       <h1 className="font-bold px-8 w-full text-center text-gray-700 text-xl">
         {" "}
         Acá podés administrar las{" "}
         <span className="text-2xl block uppercase text-violet-600">
           {" "}
           categorias del menu
         </span>
       </h1>
 
       <div className="flex justify-center mt-12">
         <div className=" w-full max-w-2xl">
           <form
             className="w-full px-4 flex flex-col justify-center items-center"
             onSubmit={formik.handleSubmit}
           >
 
 
             {/* CATEGORIA */}
             <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
               <label
                 className="w-full font-bold ease-in-out duration-300"
                 htmlFor="nueva_categoria"
               >
                 Nueva Categoria
               </label>
 
               <input
                 className="w-full text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
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
                 className="w-full font-bold ease-in-out duration-300"
                 htmlFor="posicion"
               >
                 Posicion
               </label>
 
               <input
                 className="w-full text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
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
               value="agregar categoría"
             />
 
             <button
               className=" w-full h-12 rounded-sm px-6 py-2 mt-4 bg-red-700 font-bold uppercase text-white hover:bg-red-800 cursor-pointer"
              onClick={() => navigate("/categories")}
             >
               {" "}
               cancelar{" "}
             </button>
           </form>
         </div>
       </div>
     </>
   );
}

export default AgregarCategorias;
