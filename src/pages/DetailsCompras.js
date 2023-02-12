import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import Loading from "../components/loading"
import { useParams } from 'react-router-dom';
import styles from "./DetailsCompras.module.css"
import { FaCaretSquareLeft } from 'react-icons/fa';

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
    const {compra} = useParams()

    const [details, setDetails] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(app)


    

    const UserSubCollection = collection(db,`vendas/${id}/compras/${compra}/total`)

    

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
    const UserCollection = collection(db, "vendas")
    
    
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
        <p onClick={retornar}><FaCaretSquareLeft/>Retornar</p>
        <div className={`container ${styles.cont}`}>
            <div className={styles.header}>
                {produtos && produtos.map(item => {
                        const comprador = item.comprador.replace(' ', '')
                        return (
                            <h1>{comprador}</h1>
                        )
                })}
            </div>
           <ul className={styles.list}>
                {details && details.map(item => {
                    return(
                        <>
                            <li key={item.produto}>
                                <div className={styles.item}>
                                    <p>{item.produto}</p>
                                    <p>x{item.qtd}</p>
                                    <p>R$ {item.preço.toFixed(2)}</p>
                                </div>
                            </li>
                        </>
                        
                    )
                })}
                {!loader && 
                    <div>
                        <Loading/>
                    </div>
                }
           </ul>
           
        </div>
        
        </>
    )
}