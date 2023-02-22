import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import Loading from "../components/loading"
import { useParams } from 'react-router-dom';
import styles from "./DetailsCompras.module.css"
import { FaCaretSquareLeft } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import Box_confirm from '../components/Box_Confirm';

const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };

const app = firebase.initializeApp(firebaseConfig)



export default function Details () {

    const {id} = useParams()

    const [details, setDetails] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(app)


    

    const UserSubCollection = collection(db,`testeusers/${id}/compra`)

    

    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserSubCollection);
                setDetails((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                setLoader(true)
                    };

                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])

    const retornar = () => {
        window.history.back()
    }


    const [produtos, setProdutos] = useState([])
    const UserCollection = collection(db, "testeusers")
    
    
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                setLoader(true)
                    };

                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])
    
    
    
    
    return (
        <>
        <p onClick={retornar} className={styles.btn_return}><span><FaCaretSquareLeft/></span>Retornar</p>
        <div className={`container ${styles.cont}`}>
            <div className={styles.header}>
                {produtos && produtos.map(item => {
                        if (item.id == id) {
                            return (
                                <div className={styles.header} key={item.id}>
                                        <div className={styles.title}>
                                            <h2>{item.comprador}</h2>
                                            <h4>{item.email}</h4>
                                            <div className={styles.cont_hora}>
                                                <p>{item.data}</p>
                                                <p>{item.horario}</p>
                                            </div>
                                        </div>
                                        <div className={styles.cont_total}>
                                            <h4>Total: R${item.total.toFixed(2)}</h4>
                                            <p>pagamento: {item.status == "pending" ? "pendente":<span className={styles.concluido}>{item.status}</span>}</p>
                                            
                                            {item.status == "pending"? <button className={styles.check}
                                            type="button" data-bs-toggle="modal" data-bs-target={`#CheckPayment`}><FaCheck/> pago</button>:<></>}
                                            
                                        </div>
                                    </div>
                            )
                        }
                        
                })}
            </div>
           <ul className={styles.list}>
                <h4>Detalhes da compra</h4>
                {details ? details.map(item => {
                    return(
                        <>
                            <li key={item.id}>
                                <div className={styles.item}>
                                    <p>{item.produto}</p>
                                    <p>qtd: x{item.qtd}</p>
                                    <p>R$ {item.preço.toFixed(2)}</p>
                                </div>
                            </li>
                        </>
                        
                    )
                }): <div>
                        <button onClick={() => window.location.reload()} className={styles.btn_reload}>Tente Novamente</button>
                    </div>}
                {!loader && 
                    <div>
                        <Loading/>
                    </div>
                }
           </ul>
           
        </div>
        <div className="modal fade" id="CheckPayment" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <Box_confirm
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            id=""
                            title="Confirmar Pagamento?"
                            yes="sim"
                            no="não"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}