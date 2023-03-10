import styles from "./TelaPagamento.module.css"

import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import App from "../components/Hooks/App";
import { toast, ToastContainer } from "react-toastify";
import Box_confirm from "./Box_Confirm";
import { FaWhatsapp } from "react-icons/fa";


export default function CheckOut(props) {

    const [produtos, setProdutos] = useState([])
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

    


    const [a????o, setA????o] = useState()
    
    



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
                    <div className={styles.cartao_info}><p>em at?? <span>{parcelamento[1]}x</span> de <span>R$ {parcelamento[0]}</span> sem Juros</p></div>
                </div>

                <div>
                    <button className={`${styles.btn_wpp} ${styles.btn_checkout}`}
                        type="button" data-bs-toggle="modal" data-bs-target={`#toFormCheckOut`}
                        onClick={()=> {
                            setA????o({
                                a????o:"Finalizar no Wpp",
                                title:"Finalizar compra por wpp?"
                            })

                        }}
                    >Finalizar por Whatsapp <FaWhatsapp/></button>

                    <button className={styles.btn_checkout}
                    type="button" data-bs-toggle="modal" data-bs-target={`#toFormCheckOut`}
                    onClick={()=> {
                        setA????o({
                            a????o:"Check Out Form",
                            title:"Finalizar esta compra?"
                        })
                        }}
                    >Finalizar</button>
                </div>
                    
                    

                
            </div>
        <ToastContainer/>
        <div className="modal fade" id="toFormCheckOut" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
                data-bs-backdrop="static" data-bs-keyboard="false">
                <div className={`modal-dialog modal-md`}>
                    <div className="modal-content">
                        <Box_confirm
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            yes="confirmar"
                            no="cancelar"
                            config={a????o && a????o}
                            />
                    </div>
                </div>
            </div>
        </>
    )
}