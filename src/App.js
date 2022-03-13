import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dishes from "./Dishes";
import NuevoPlato from "./NuevoPlato";

function App() {
  return (
    <Router>

    <Routes>

      <Route path='/' exact element={<Dishes/>}  />
      <Route path='/addDish' exact element={<NuevoPlato/>}  />
      {/* <Route path='/detalle' exact element={<Detalle/>}   />*/}

    </Routes>

  </Router>
  );
}

export default App;
