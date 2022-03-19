import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dishes from "./Dishes";
import NuevoPlato from "./NuevoPlato";
import AgregarCategorias from './AgregarCategorias';
import Categorias from './Categorias';

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
