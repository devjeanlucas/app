import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home"
import Footer from "./layouts/Footer"
import NavBar from "./layouts/NavBar"
import Carrinho from "./pages/Carrinho"
import Estoque from "./pages/Estoque"
import Produtos from "./pages/Produtos"
import {firebase, auth} from "./service/firebase"
import { useState, useEffect } from "react";
import styles from "./pages/Carrinho.module.css"
import TelaCheckOutMobile from "./components/TelaPagamentoMobile"



function App() {
  
  function pegaItems() {
    let listGeral = []
    if (localStorage.hasOwnProperty("itenscarrinho")) {
        listGeral = JSON.parse(localStorage.getItem("itenscarrinho"))
    }
    
    if (listGeral.length == 0) {
        return 0
    } else {
        let listPrecos = []
        
        listGeral.map(item => {listPrecos.push(item.qtd)})
        var soma = listPrecos.reduce((soma, i) => {return soma + i})
        return soma
    }
  }
  pegaItems()

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/carrinho" element={<Carrinho/>}></Route>
        <Route path="/estoque/todos" element={<Estoque/>}></Route>
        <Route  path="/produtos/:id" element={<Produtos/>}/>
      </Routes>
      <Footer/>

      <button className={styles.view_mobile} type="button" data-bs-toggle="modal" data-bs-target="#checkOutModal"><p>Minha Sacola</p></button>
      
      
      <div className="modal fade" id="checkOutModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <TelaCheckOutMobile type="button" 
                    dismiss="modal"
                    aria_label="Close"/>
                    </div>
                </div>
            </div>
    </Router>
  );
}

export default App;
