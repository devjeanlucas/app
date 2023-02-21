import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore, addDoc} from "@firebase/firestore";
import { Link, useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import styles from "./QrCodePage.module.css"
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };
const app = firebase.initializeApp(firebaseConfig)


export default function QrCodePage () {
    
    const[dadosCompra, setDadosUserCompra] = useState([])
    const db = getFirestore(app)
    const {id} = useParams()
    const UserSubCollection = collection(db, `testeusers`)

    useEffect (()=>{
        const getUsers = async () => {
        const data = await getDocs(UserSubCollection);
        setDadosUserCompra((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        };
        getUsers()
        
    },[])
    
    const copy = () => {
        const copy = document.querySelector('#copy')
        const value = copy.value
        navigator.clipboard.writeText(value)
        toast.success("Copiado para Área de Transferência")
    }
    
    
    return (
        <>
            {dadosCompra && dadosCompra.map(item=> {
                if (item.id == id) {
                    return (
                        <>
                            <div className={styles.container}>
                                <div className='row'> 
                                    <div className='col-12'>
                                        <div className={styles.content}>
                                            <QRCode value={item.qr_code}/>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className={styles.content}>
                                            <button className={styles.btn_copy} value={item.qr_code} id="copy" onClick={()=> {copy()}}>Copiar</button>
                                        </div>
                                        <div className={styles.cont_info}>
                                            <h4>Informações do Pagamento</h4>
                                            <div className={styles.info}>
                                                <p>Id pagamento: </p>
                                                <p>nº <strong>{item.idPagamento}</strong></p>
                                            </div>
                                            <div className={styles.info}>
                                                <p>Valor:</p>
                                                <p><strong>R${item.total.toFixed(2)}</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }   
            })}
            <ToastContainer/>
        </>
    )
}