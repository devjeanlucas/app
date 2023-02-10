import { Link } from "react-router-dom"
import styles from "./TelaPagamentoMobile.module.css"



export default function CheckOut() {

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
    
    function pegaPreco() {
        let listGeral = []
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            listGeral = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        if (listGeral.length === 0) {
            return 0
        } else {
            let listPrecos = []
            let list = []
            listGeral.map(item => {return listPrecos.push({qtd: item.qtd, preco: item.preco})})
            listPrecos.map(item => {return list.push(item.qtd * item.preco)})
            var soma = list.reduce((soma, i) => {return soma + i})

            return soma
        }
    }
    function Parcelar () {
        let total = pegaPreco()
        let list = []
        var parcela = 0
        var count = 0
        
        if (total < 100) {
            count+=1
            parcela+=total
            list.push(parcela.toFixed(2), count)
        } else if (total >= 100) {
            count+=2
            parcela = parcela + total / count
            list.push(parcela.toFixed(2), count) 
        }
        else if (total >= 400) {
            count+=3
            parcela = parcela + total / count
            list.push(parcela.toFixed(2), count)
        }

        return list
    }
    let parcelamento = Parcelar()
    let total = pegaPreco()
    let qtd = pegaItems()



    return (
        <>
            <div className={`${styles.container}`}>
                <h2>Seu Pedido</h2>
                <div className={styles.calc}>
                    <div className={styles.first_row}>
                        <p>Produtos ({qtd}):</p>
                        <p>R$ {total.toFixed(2)}</p>
                    </div>
                    <div className={styles.second_row}>
                        <h4>Total:</h4>
                        <h4>R$ {total.toFixed(2)}</h4>
                    </div>
                    <div className={styles.cartao_info}><p>em até <span>{parcelamento[1]}x</span> de <span>R$ {parcelamento[0]}</span> sem Juros</p></div>
                </div>
                <Link to="/carrinho">ver carrinho</Link>
                <button className={styles.btn_checkout}>Finalizar</button>
            </div>
        </>
    )
}