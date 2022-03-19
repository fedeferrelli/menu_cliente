import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dishes from "./Components/Platos/Dishes";
import NuevoPlato from "./Components/Platos/NuevoPlato";
import AgregarCategorias from './Components/Categorias/AgregarCategorias';
import Categorias from './Components/Categorias/Categorias';

function App() {
  return (
    <Router>

    <Routes>

      <Route path='/categories' exact element={<Categorias/>}  />
      <Route path='/addNewCategory' exact element={<AgregarCategorias/>}  />
      
      <Route path='/addDish' exact element={<NuevoPlato/>}  />
     <Route path='/' exact element={<Dishes/>}   />

    </Routes>

  </Router>
  );
}

export default App;
