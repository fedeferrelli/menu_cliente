import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dishes from "./Components/Platos/Dishes";
import NuevoPlato from "./Components/Platos/NuevoPlato";
import AgregarCategorias from './Components/Categorias/AgregarCategorias';
import Categorias from './Components/Categorias/Categorias';

function App() {
  return (
    <div className="bg-gray-800 flex">
    <div className="max-w-[540px] m-auto">
    <Router>

    <Routes>
    <Route path='/' exact element={<Dishes/>} /> 
      <Route path='/categories' exact element={<Categorias/>}  />
      <Route path='/addNewCategory' exact element={<AgregarCategorias/>}  />
      
      <Route path='/addDish' exact element={<NuevoPlato/>}  />
      

    </Routes>

  </Router>
  </div>
  </div>
  );
}

export default App;
