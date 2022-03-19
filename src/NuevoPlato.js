import React, { useState, useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import firebase from "./util/firebaseConfig";
import { useNavigate } from 'react-router-dom';
import FileUploader from "react-firebase-file-uploader";
import _ from "lodash";

const NuevoPlato = () => {

  // states para las imagenes

  const [subiendo, setSubiendo] = useState(false);

  const [progreso, setProgreso] = useState(0);

  const [urlimagen, setUrlimagen] = useState("");

const [categorias, setCategorias] = useState([])

  // obtener datos de categorias

  useEffect(() => {

    const obtenerCategorias = () => {
        firebase.db.collection('categorias').onSnapshot(handleSnapshot); 

     }
     obtenerCategorias();
     
 }, []);

 const handleSnapshot = (snapshot) =>{
  const categorias_list = snapshot.docs.map(doc => {
      return {
          id: doc.id,
          ...doc.data()
      }
  });

      const categorias_sorteadas = _.sortBy(categorias_list, 'posicion');
      setCategorias(categorias_sorteadas)     
}


  // validacion y leer datos de formulario

  const formik = useFormik({
    initialValues: {
      plato: "",
      categoria: "",
      descripcion: "",
      precio: "",
      tags: "",
    },

    validationSchema: Yup.object({
      plato: Yup.string()
        .min(3, "Los nombres deben tener al menos 3 caracteres")
        .required("El nombre es obligatorio"),

      precio: Yup.number()
        .min(1, "Debes ingresar un numero")
        .required("El precio es obligatorio"),

      categoria: Yup.string()
        .min(3, "Los nombres deben tener al menos 1 caracter")
        .required("La categoría es obligatoria"),

      descripcion: Yup.string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .required("La descripción es obligatoria"),
    }),

    onSubmit: (plato) => {
      try {
        plato.existencia = "si";
        plato.image = urlimagen;
        firebase.db.collection("platos").add(plato);
        formik.resetForm();
       
      } catch (error) {
        console.log(error);
      }
      navigate('/');
    },
  });

  // Todo sobre las imagenes

  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };

  const handleUploadError = (error) => {
    setSubiendo(false);
    console.log(error);
  };

  const handleUploadSuccess = async (nombre) => {
    setProgreso(100);
    setSubiendo(false);

    const url = await firebase.storage
      .ref("platos")
      .child(nombre)
      .getDownloadURL();

    setUrlimagen(url);

    console.log(url);
  };

  // hook para redirecionar
  const navigate  = useNavigate();

  return (
    <>
      <h1 className="font-bold px-8 w-full text-center text-gray-700 text-xl">
        {" "}
        Acá podés ingresar un{" "}
        <span className="text-2xl block uppercase text-violet-600">
          {" "}
          nuevo plato
        </span>
      </h1>

      <div className="flex justify-center mt-12">
        <div className=" w-full max-w-2xl">
          <form
            className="w-full px-4 flex flex-col justify-center items-center"
            onSubmit={formik.handleSubmit}
          >
            {/* IMAGEN */}
            <div className="w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300"
                htmlFor="imagen"
              >
                Imagen
              </label>

              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={firebase.storage.ref("platos")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                className="w-full text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
              />
            </div>

            {progreso === 100 ? (
              <div
                className="w-full mt-1 mb-5 text-sm bg-green-100 border-l-4 border-green-500 text-green-700 p-2"
                role="alert"
              >
                <p className="font-bold"> La imagen se subió correctamente</p>
              </div>
            ) : null}

            {subiendo ? (
              <div
                className="w-full mt-1 mb-5 text-sm bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2"
                role="alert"
              >
                <p className="font-bold"> Cargando imagen</p>
              </div>
            ) : null}

            {/* PLATO */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300"
                htmlFor="plato"
              >
                Plato
              </label>

              <input
                className="w-full text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
                id="plato"
                type="text"
                placeholder="Nombre"
                value={formik.values.plato.toLowerCase()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.plato && formik.errors.plato ? (
              <div
                className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                role="alert"
              >
                <p className="font-bold"> Hubo un error: </p>
                <p>{formik.errors.plato}</p>
              </div>
            ) : null}

            {/* DESCRIPCION */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300"
                htmlFor="descripcion"
              >
                Descripción del plato
              </label>

              <textarea
                className="w-full text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm"
                id="descripcion"
                type="text"
                placeholder="Descripción"
                value={formik.values.descripcion.toLowerCase()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>

            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div
                className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                role="alert"
              >
                <p className="font-bold"> Hubo un error: </p>
                <p>{formik.errors.descripcion.toLowerCase}</p>
              </div>
            ) : null}


            {/* CATEGORIA SELECT */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300"
                htmlFor="categoria_select"
              >
                Categoría
              </label>

              <select
                name="categoria"
                id="categoria"
                className="w-full text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300 px-3 py-2  rounded-sm "
                
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" className="bg-slate-200 shadow-none">
                  Seleccione una categoría{" "}
                </option>
                {categorias.map((categoria) => (
                  <option
                    key={Math.random()}
                    value={categoria.nueva_categoria}
                    className="bg-slate-200 capitalize"
                  >
                    {categoria.nueva_categoria}{" "}
                  </option>
                ))}
              </select>

            </div>
            {formik.touched.categoria && formik.errors.categoria ? (
              <div
                className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                role="alert"
              >
                <p className="font-bold"> Hubo un error: </p>
                <p>{formik.errors.categoria}</p>
              </div>
            ) : null} 

            {/* <Input type="select" name="ccmonth" id="ccmonth" dropdown1 ={this.state.dropdown1}>
    { this.state.dropdown1.map(dropdown => { 
        return <option dropdown={dropdown} value={dropdown.value}>
            {dropdown.show}</option>;
        })
    }
</Input> */}

            {/* PRECIO */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300"
                htmlFor="precio"
              >
                Precio
              </label>

              <input
                className="w-full text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
                id="precio"
                type="float"
                placeholder="Sin el signo $"
                min="0"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.precio && formik.errors.precio ? (
              <div
                className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                role="alert"
              >
                <p className="font-bold"> Hubo un error: </p>
                <p>{formik.errors.precio}</p>
              </div>
            ) : null}

            {/* TAGS */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300"
                htmlFor="tags"
              >
                Tags
              </label>

              <textarea
                className="w-full text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm"
                id="tags"
                type="text"
                placeholder="palabras clave para facilitar la búsqueda"
                value={formik.values.tags.toLowerCase()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>

            <input
              type="submit"
              className=" w-full h-12 rounded-sm px-6 py-2 mt-8 bg-green-700 font-bold uppercase text-white hover:bg-green-800 cursor-pointer"
              value="agregar plato"
            />

            <button
              className=" w-full h-12 rounded-sm px-6 py-2 mt-4 bg-red-700 font-bold uppercase text-white hover:bg-red-800 cursor-pointer"
              onClick={() => navigate("/")}
            >
              {" "}
              cancelar{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoPlato;
