import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home"
import Footer from "./layouts/Footer"
import NavBar from "./layouts/NavBar"
import Carrinho from "./pages/Carrinho"
import Estoque from "./pages/Estoque"
import Produtos from "./pages/Produtos"
import Clientes from "./pages/Clientes";
import ContainerCompras from "./pages/ContainerCompras"
import DetailsCompra from "./pages/DetailsCompras";

import FormCheckOut from "./pages/FormCheckOut"
import FormularioUsuario from "./components/FormularioUsuario"
import FormularioCarrinho from "./components/FomularioCarrinho"
import Congratulation from "./components/Congratulations";
import Payament from "./Payment/Payment";
import Minhascompras from "./components/MinhasComprasUser";
import DetalhesDaCompra from "./components/Detalhedecompra"
import ListaDasCompras from "./components/ListaDasCompras";
import QrCodePage from "./components/QrCodePage";




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
          <Route exact path="/vendas/detailsvenda/:id" element={<DetailsCompra/>}/>
        </Route>

        <Route path="/checkout" element={<FormCheckOut/>}>
          <Route path="/checkout/usuario" element={<FormularioUsuario/>}/>
          <Route path="/checkout/confirmItens" element={<FormularioCarrinho/>}/>
        </Route>

        <Route path="/success" element={<Congratulation/>}/>
        
        <Route path="/payament" element={<Payament/>}/>
        


        <Route path="Compras" element={<Minhascompras/>}>
          <Route exact path="/Compras/MinhasCompras" element={<ListaDasCompras/>}/>
          <Route exact path="/Compras/MinhasCompras/DetalhesDaCompra/:id" element={<DetalhesDaCompra/>}/>
          <Route exact path="/Compras/MinhasCompras/DetalhesDaCompra/:id/qrcode" element={<QrCodePage/>}/>
        </Route>

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
