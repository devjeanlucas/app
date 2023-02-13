import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home"
import Footer from "./layouts/Footer"
import NavBar from "./layouts/NavBar"
import Carrinho from "./pages/Carrinho"
import Estoque from "./pages/Estoque"
import Produtos from "./pages/Produtos"
import Btn_Sacola from "./components/Btn_Sacola";
import Clientes from "./pages/Clientes";
import Compras from "./pages/Compras";
import ContainerCompras from "./pages/ContainerCompras"
import DetailsCompra from "./pages/DetailsCompras";
import FormCheckOut from "./pages/FormCheckOut"




function App() {
  

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/carrinho" element={<Carrinho/>}></Route>
        <Route path="/estoque/todos" element={<Estoque/>}></Route>
        <Route  path="/produtos/:id" element={<Produtos/>}/>

        <Route path="/vendas" element={<ContainerCompras/>}>
          <Route path="/vendas/clientes" element={<Clientes/>}/>
          <Route path="/vendas/clientes/:id" element={<Compras/>}/>
          <Route exact path="/vendas/clientes/:id/:compra" element={<DetailsCompra/>}/>
        </Route>

        <Route path="/checkOut" element={<FormCheckOut/>}></Route>
        
      </Routes>
      <Footer/>
      <Btn_Sacola/>
    </Router>
  );
}

export default App;
