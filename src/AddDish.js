import React, {useState} from "react";
import { setData, storage} from "./util/firebaseConfig";
import {getDownloadURL, uploadBytesResumable, ref} from '@firebase/storage'
import { useFormik } from "formik";
import * as Yup from "yup";


function AddDish() {


  const formik = useFormik({
    initialValues: {
      plato: "",
      categoria: "",
      descripcion: "",
      precio: "",
      tags:""
    },

    //Validación de datos del form con librería YUP

    validationSchema: Yup.object({
      plato: Yup.string()
        .required("Recuerda ingresar el Nombre")
        .min(3, "Un poco más ..."),
      categoria: Yup.string()
        .required("Recuerda ingresar la Categoría")
        .min(3, "Un poco más ..."),
      descripcion: Yup.string()
        .required("Recuerda ingresar la Descripción")
        .min(10, "Un poco más ..."),
      precio: Yup.number("El Precio debe ser un número").required(
        "Recuerda ingresar el Precio"),
      tags: Yup.string(),
    }),

    onSubmit: (formData) => {

      if (url===''){setImageError(true)}

      else{

        const {plato, categoria, descripcion, precio, tags} = formData;
     
        setData({
          plato: plato,
          categoria: categoria,
          descripcion: descripcion,
          precio: precio,
          url: url,
          tags: tags,
          stock: "Si",
        });

        formik.resetForm();
        setProgress('')
      }
    },
  });


  // Images treatment


const [progress, setProgress] = useState('')
const [url, setURL] = useState('')

const [imageError, setImageError] = useState(false)


const formImageHandler = (e) =>{
  e.preventDefault();
  
  const file = e.target[0].files[0]

  uploadFile (file)


}

const uploadFile = (file) =>{

  if (!file) return;

  const imageRef = ref(storage, `platos_img/${Math.random()}`)

  const uploadTask = uploadBytesResumable(imageRef, file)

  uploadTask.on("state_changed", (snapshot)=>{
    const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)

      setProgress(prog) 

  },
  (err) => console.log(err),
  ()=>{ getDownloadURL(uploadTask.snapshot.ref).then((url)=>setURL(url)) }
  
  )

  setImageError(false)
}

  return (
    <div className="w-full py-8 flex flex-col justify-center items-center bg-slate-100">
      <h1 className="font-bold px-8 w-full text-center text-gray-700 text-xl">
        {" "}
        Acá podés ingresar un{" "}
        <span className="text-2xl block uppercase text-violet-600">
          {" "}
          nuevo plato
        </span>
      </h1>


      <div>

      <form onSubmit={formImageHandler} className="w-full px-4 flex flex-col justify-center items-center">
          <label
            htmlFor="image"
            className="w-full font-bold ease-in-out duration-300 text-gray-500 focus-within:text-violet-700"
          >
            {" "}
            Imagen
          </label>
          <div className="w-full text-black border bg-white border-gray-400 outline-none focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm">
          <input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            className="w-full py-1"
            
           
          ></input>
          
          <button  type="submit" className={progress === '' ? "w-full h-10 bg-orange-600 text-white font-bold" : progress === 100 ? "w-full h-10 text-white font-bold bg-green-700/90" : "w-full h-10 text-white font-bold bg-yellow-400/70"}>
          {progress === '' ? "Cargar foto" : progress === 100 ? "Foto cargada" : `Cargando: ${progress}%` }</button> 
          </div>
          { imageError===true &&  <p className="text-red-300">Recuerda cargar una imagen</p>}
        </form>

      <form
        className="w-full px-4 flex flex-col justify-center items-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="mt-8 w-full text-gray-500 focus-within:text-violet-700">
          <label
            htmlFor="plato"
            className="w-full font-bold ease-in-out duration-300"
          >
            {" "}
            Plato
          </label>
          <input
            type="text"
            name="plato"
            id="plato"
            placeholder="Nombre"
            className="w-full text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
            onChange={formik.handleChange}
            value={formik.values.plato}
          ></input>
           { formik.touched.plato && <p className="text-red-300">{formik.errors.plato}</p>}
        </div>

        <div className="mt-8 w-full text-gray-500 focus-within:text-violet-700">
          <label
            htmlFor="categoria"
            className="w-full font-bold ease-in-out duration-300"
          >
            {" "}
            Categoría
          </label>
          <input
            type="text"
            name="categoria"
            id="categoria"
            placeholder="A qué parte del menú pertenece?"
            className="w-full text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
            onChange={formik.handleChange}
            value={formik.values.categoria}
          ></input>
          { formik.touched.categoria && <p className="text-red-300">{formik.errors.categoria}</p>}
        </div>

        <div className="mt-8 w-full text-gray-500 focus-within:text-violet-700">
          <label
            htmlFor="descripcion"
            className="w-full font-bold ease-in-out duration-300"
          >
            {" "}
            Descripción
          </label>
          <textarea
            type="text"
            name="descripcion"
            id="descripcion"
            placeholder="Qué hace a este plato tan delicioso?"
            className="w-full text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm"
            onChange={formik.handleChange}
            value={formik.values.descripcion}
          ></textarea>
           { formik.touched.descripcion && <p className="text-red-300">{formik.errors.descripcion}</p>}
        </div>

        <div className="mt-8 w-full text-gray-500 focus-within:text-violet-700">
          <label
            htmlFor="precio"
            className="w-full font-bold ease-in-out duration-300"
          >
            {" "}
            Precio
          </label>
          <input
            type="float"
            name="precio"
            id="precio"
            placeholder='No agregues el "$"'
            className="w-full text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm"
            onChange={formik.handleChange}
            value={formik.values.precio}
          ></input>
           { formik.touched.precio && <p className="text-red-300">{formik.errors.precio}</p>}
        </div>

        <div className="mt-8 w-full text-gray-500 focus-within:text-violet-700">
          <label
            htmlFor="tags"
            className="w-full font-bold ease-in-out duration-300"
          >
            {" "}
            Tags
          </label>
          <textarea
            type="text"
            name="tags"
            id="tags"
            placeholder='Agregá palabras para que encuentren más fácil el plato'
            className="w-full text-black border border-gray-400 outline-none focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm"
            onChange={formik.handleChange}
            value={formik.values.tags}
          ></textarea>
          
        </div>

        <button
          type="submit"
          className=" w-full h-12 rounded-sm px-6 py-2 mt-10 bg-green-700 font-bold uppercase text-white shadow-lg hover:bg-green-800 cursor-pointer"
        >
          {" "}
          Cargar Plato{" "}
        </button>
      </form>




        </div>
    </div>
  );
}

export default AddDish;
