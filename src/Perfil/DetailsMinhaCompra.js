import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { Link, useParams } from 'react-router-dom';
import {firebase, auth} from "../service/firebase"
import styles from "./DetailsMinhaCompra.module.css"
import User from "../components/Hooks/User";
import App from "../App";
import moment from "moment";
import QRCode from "react-qr-code";
import { toast, ToastContainer } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";


export default function DetailCompra () {
    
    
    const [details, setDetails] = useState([])
    const [comprador, setComprador] = useState([])
    const {id} = useParams()
    const db = getFirestore(App)

    const UserSubCollection = collection(db,`testeusers/${id}/compra`)
    const CompradorCollection = collection(db, "testeusers")


    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserSubCollection);
                setDetails((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                const dataComprador = await getDocs(CompradorCollection);
                setComprador((dataComprador.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };

                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])

    const copy = () => {
        const copy = document.querySelector('#copy')
        const value = copy.value
        navigator.clipboard.writeText(value)
        toast.success("Copiado para Área de Transferência")
    }
    

    return (
        <>
        { User.length> 0 && comprador && details && 
        comprador.map(item => {
            if (User[0].id == item.iduser && item.id == id) {
                return (
                        <div className={styles.container}>
                                    <div>
                                        <h4>Detalhes de Pagamento</h4>

                                        <ul className={`row ${styles.detalhes_comprador}`}>
                                            <div className="col-sm-6">
                                                <div>
                                                <li>idPagamento:<strong> {item.idPagamento}</strong></li>
                                                <li>Data de Compra: <strong>{item.data}</strong></li>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div>
                                                    <li>Data Vencimento: <strong>{moment(item.vencimento).format('DD/MM/YYYY')}</strong></li>
                                                </div>
                                            </div>
                                        </ul>

                                    </div>
                                    <div className={styles.line}></div>
                                    <div className={styles.header}>
                                        <h4>Detalhes da Compra</h4>
                                        <ul className={styles.cont_info_compra}>
                                        {details && details.map(dados => {
                                            return (
                                                <li className={`row`}>
                                                        <div className="col-1">
                                                            <p>{dados.qtd}x</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p>{dados.produto}</p>
                                                        </div>
                                                        <div className="col-4 col-sm-3 col-md-2">
                                                            <div className={styles.flex}>
                                                                <p>R$ </p>
                                                                <p>{dados.preço.toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                </li>
                                            )
                                        })}
                                        </ul>
                                    <div>
                                        <div className={styles.cont_total}>
                                            <p>Total: <strong>{"R$ "+item.total.toFixed(2)}</strong></p>
                                        </div>
                                    </div>
                                    <div className={styles.line}></div>
                                    <div className={styles.cont_status}>
                                        <p
                                        className={item.status == "concluido" && styles.bg_concluido ||
                                        item.status == "pending" && styles.bg_pending ||
                                        item.status == "expirado" && styles.bg_expirado
                                        }   
                                        >{item.status}</p>
                                    </div>
                                    <div>
                                        {item.status == "pending"&& 
                                        <details>
                                            <summary><strong>PAGAR AGORA</strong></summary>
                                            <div>
                                                <div className={styles.content_qr_code}>
                                                    <QRCode value={item.qr_code}/>
                                                </div>
                                                <input value={item.qr_code}/>
                                                <div className={styles.content_qr_code}>
                                                    <button className={styles.btn_copy} value={item.qr_code} id="copy" onClick={()=> {copy()}}>Copiar <FaRegCopy/></button>
                                                </div>
                                            </div>
                                        </details>
                                        }
                                    </div>
                                    <div className={styles.line}></div>

                                    <Link to="/Home/MinhasCompras"><button className={styles.btn_return}>retornar</button></Link>
                                    </div>
                        </div>
                )
            }
        })
        }
        <ToastContainer/>
        </>
    )
}