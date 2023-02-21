import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore, addDoc} from "@firebase/firestore";
import Loading from "./loading"
import { Link, useParams } from 'react-router-dom';
import styles from "./Detalhedecompra.module.css"
import {FaExclamation,FaCheck,FaCircle} from "react-icons/fa"

const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };
const app = firebase.initializeApp(firebaseConfig)



export default function Compra () {
    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)
    const[dadosCompra, setDadosUserCompra] = useState([])
    const db = getFirestore(app)
    const {id} = useParams()
    const UserSubCollection = collection(db, `testeusers/${id}/compra`)
    const UserCollection = collection(db, "testeusers")
  
    useEffect (()=>{
        const getUsers = async () => {
        const data = await getDocs(UserSubCollection);
        setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))

        const dataSub = await getDocs(UserCollection);
        setDadosUserCompra((dataSub.docs.map((doc) => ({...doc.data(), id: doc.id}))))

        setLoader(true)

        };
        getUsers()
        
    },[])
    const retornar =() => {
        window.history.back()
    }


    
    

    return (
       <>
        <div className={styles.container}>
            <h4>Detalhes da compra</h4>
            <div className={styles.header}>
                {dadosCompra && dadosCompra.map(dados => {
                    if (dados.id == id) {
                        return (
                            <>
                            <div className={styles.info}>
                                <p>pedido nº: <strong>{dados.idPagamento}</strong></p>
                                <FaCircle className={styles.circle}/>
                                <p><strong>{dados.data}</strong></p>
                                <p>às <strong>{dados.horario}</strong></p>

                            </div>
                            </>
                        )
                    }
                })}


            <h4>Resumo do pedido: </h4>
            <ul className={styles.list_produtos}>
                {produtos && produtos.map(item => {
                    return (
                        <li key={item.id} className={styles.produto}>
                            <div className='row'>
                                <div className={`col-2`}>
                                    <div className={styles.cont_foto}>
                                        <img src={item.foto} className={styles.foto}/>
                                    </div>
                                </div>
                                <div className='offset-sm-2 col-8'>
                                    <div className={styles.cont_info}>
                                        <p>{item.produto}</p>
                                        <p>qtd: x{item.qtd}</p>
                                        <p>R$ {item.preço.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
                </ul>

                <div className={styles.method}>
                    <p>Mét. Pagamento</p>
                    <p>Pix</p>
                </div>

                <h4>Resumo de Valores:</h4>
                <ul className={styles.total_list}>
                    {dadosCompra && dadosCompra.map(dados => {
                        if (dados.id == id) {
                            return (
                                <>
                                <li key={dados.id} >
                                    <div className={styles.box_price}>
                                        <p>Subtotal</p>
                                        <p>R$ {dados.total.toFixed(2)}</p>
                                    </div>
                                    <div className={styles.box_price}>
                                        <p>Taxa de entrega</p>
                                        <p>R$ 0.00</p>
                                    </div>
                                    <div className={styles.box_price}>
                                        <strong className={styles.price_total}>Total</strong>
                                        <p><strong>R$ {dados.total.toFixed(2)}</strong></p>
                                    </div>
                                </li>
                                </>
                            )
                        }
                    })}
                </ul>

                {dadosCompra && dadosCompra.map(dados => {
                    if (dados.status == "pending") {
                            if (dados.id == id) {
                                return (
                                    <div className={`${dados.status == "pending" ? styles.pendente : styles.concluido}  ${styles.status}`}>
                                        <p>status do pagamento:</p>
                                        <p className={styles.info_status}>{dados.status =="pending" && <span><FaExclamation/>pendente</span>}</p>
                                        <Link to={`/Compras/MinhasCompras/DetalhesDaCompra/${id}/qrcode`}className={styles.link_to_qr_code}>pagar agora!</Link>
                                    </div>
                                )
                            }
                    }
                    
                })}
            </div>
            {!loader && 
            <div className={styles.cont_loader}>
                <Loading/>
            </div>
            }
        </div>
       </>
    )
}