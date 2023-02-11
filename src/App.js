import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home"
import Footer from "./layouts/Footer"
import NavBar from "./layouts/NavBar"
import Carrinho from "./pages/Carrinho"
import Estoque from "./pages/Estoque"
import Produtos from "./pages/Produtos"
import Btn_Sacola from "./components/Btn_Sacola";
import Compras from "./pages/Compras";




function App() {
  

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/carrinho" element={<Carrinho/>}></Route>
        <Route path="/estoque/todos" element={<Estoque/>}></Route>
        <Route  path="/produtos/:id" element={<Produtos/>}/>
        <Route path="/compras" element={<Compras/>}/>
      </Routes>
      <Footer/>
      <Btn_Sacola/>
    </Router>
  );
}

export default App;
