import styles from "./TelaPagamento.module.css"
import { Link } from "react-router-dom"

import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import App from "../components/Hooks/App";
import { toast, ToastContainer } from "react-toastify";


export default function CheckOut(props) {

    const [produtos, setProdutos] = useState([])
    const [state, setState] = useState(false)
    const db = getFirestore(App)
    const UserCollection = collection(db, "produtos")

  
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])


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
    function pegaSacola () {
        let listGeral = []
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            listGeral = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        return listGeral
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
        } else if (total >= 800) {
            count+=6
            parcela = parcela + total / count
            list.push(parcela.toFixed(2), count) 
        }
        else if (total >= 400) {
            count+=3
            parcela = parcela + total / count
            list.push(parcela.toFixed(2), count) 
        }
        else if (total >= 100) {
            count+=2
            parcela = parcela + total / count
            list.push(parcela.toFixed(2), count)
        }

        return list
    }
    let parcelamento = Parcelar()
    let total = pegaPreco()
    let qtd = pegaItems()
    let sacola = pegaSacola()

    

    function VerificaEstoque () {
        produtos && produtos.map(dados => {
            sacola && sacola.map(item => {
                if (dados.id == item.id) {
                    if (dados.estoque < item.qtd) {
                        toast.error(`${dados.nome} quantidade superior ao estoque`)
                        setState(false)
                    } else {
                        setState(true)  
                    }
                }   
            })
        })
    }
    
    



    return (
        <>
            <div className={`${styles.container} ${props.className}`}>
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
                    {!state ? 
                    <button className={` ${styles.btn_checkout}`}
                    onClick={()=> VerificaEstoque()}
                    >Finalizar
                    </button>:
                    <Link to="/checkOut/usuario">
                        <button className={styles.btn_checkout}
                        >Finalizar</button>
                    </Link>
                    }
                    

                
            </div>
        <ToastContainer/>
        </>
    )
}