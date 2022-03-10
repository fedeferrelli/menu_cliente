import React from "react";

function ShowDish({ dish }) {
  const { url, plato, descripcion, precio, categoria } = dish;
  return (
    <div className="w-full sm:w-1/5  h-28 sm:h-96 flex flex-row sm:flex-col overflow-hidden my-4 mx-2 box-border rounded-md shadow-lg border border-gray-400 bg-gray-100">
      <img
        src={url}
        className="w-28 sm:w-full h-28 sm:h-auto p-1  "
        alt="plato_img"
      />

      <div className="w-3/4 sm:w-full h-full p-1">
        
        <div className="text-xl text-gray-700 font-bold capitalize">{plato}</div>

        <div className="flex  text-gray-500">{descripcion.length < 37 ? descripcion : `${descripcion.slice(0, 37)}...`}  </div>
      </div>

      <div className="w-1/4 sm:w-full h-full p-1 text-center text-xl font-bold text-gray-700">${precio}</div>
    </div>
  );
}

export default ShowDish;
