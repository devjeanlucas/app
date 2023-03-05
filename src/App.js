import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home"
import Footer from "./layouts/Footer"
import NavBar from "./layouts/NavBar"
import Carrinho from "./pages/Carrinho"
import Estoque from "./PagesCategories/ContCategories"
import Produtos from "./pages/Produtos"
import Clientes from "./PainelAdmin/Clientes";
import ContainerCompras from "./PainelAdmin/ContainerCompras"
import DetailsCompra from "./PainelAdmin/DetailsCompras";

import FormCheckOut from "./pages/FormCheckOut"
import FormularioUsuario from "./components/FormularioUsuario"
import FormularioCarrinho from "./components/FomularioCarrinho"
import Payament from "./Payment/Payment";
import Minhascompras from "./Perfil/MinhasComprasUser";
import DetalhesDaCompra from "./Perfil/DetailsMinhaCompra"
import ListaDasCompras from "./Perfil/ListaDasCompras";
import QrCodePage from "./components/QrCodePage";
import MeusFavoritos from "./Perfil/MeusFavoritos";
import Perfil from "./Perfil/Perfil";
import EditeItem from "./PainelAdmin/EditeItem";
import Container from "./components/Container";
import PainelEstoqueAdmin from "./PainelAdmin/PainelEstoqueAdmin";




function App() {
  

  return (
    <Router>
      <NavBar/>
      <Container>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/carrinho" element={<Carrinho/>}></Route>
        
          <Route path="/estoque/:categoria" element={<Estoque/>}/>

          <Route path="/edit/:id" element={<EditeItem/>}/>
          
          <Route  path="/produtos/:produto" element={<Produtos/>}/>

          <Route path="/vendas" element={<ContainerCompras/>}>
            <Route path="/vendas/clientes" element={<Clientes/>}/>
            <Route exact path="/vendas/clientes/detailsvenda/:id" element={<DetailsCompra/>}/>
          </Route>
          <Route path="/checkout" element={<FormCheckOut/>}>
            <Route path="/checkout/usuario" element={<FormularioUsuario/>}/>
            <Route path="/checkout/confirmItens" element={<FormularioCarrinho/>}/>
          </Route>
        
          <Route path="/payament" element={<Payament/>}/>
          <Route path="/meuestoque" element={<PainelEstoqueAdmin/>}/>
        
        
          <Route exact path="/Perfil" element={<Perfil/>}/>
          
          <Route path="Home" element={<Minhascompras/>}>
            <Route exact path="/Home/MinhasCompras/:status" element={<ListaDasCompras/>}/>

            <Route exact path="/Home/MinhasCompras/DetalhesDaCompra/:id" element={<DetalhesDaCompra/>}/>


            <Route exact path="/Home/MinhasCompras/DetalhesDaCompra/:id/qrcode" element={<QrCodePage/>}/>
            <Route excat path="/Home/MeusFavoritos" element={<MeusFavoritos/>}/>
          </Route>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
