import styles from "../pages/Carrinho.module.css"
import TelaCheckOutMobile from "../components/TelaPagamentoMobile"
import { useState } from "react"

export default function Btn_Sacola () {
    
    function atualiza () {
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
            console.log(soma)
            return soma
        }
    }

    const [seed, setSeed] = useState(1);

    const reset = () => {
        setSeed(Math.random());
    }
    

    
    
    
    return (
        <div>
            <button className={styles.view_mobile} type="button" data-bs-toggle="modal" data-bs-target="#checkOutModal" onClick={reset}><p>Minha Sacola</p></button>
                  
                  
                  <div className="modal fade" id="checkOutModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className={`modal-dialog modal-sm`}>
                        <div className="modal-content">
                            <TelaCheckOutMobile type="button"
                            dismiss="modal"
                            aria_label="Close"
                            key={seed}/>
                        </div>
                    </div>
                </div>
        </div>
    )
}