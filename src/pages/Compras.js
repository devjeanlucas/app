import styles from "./Compras.module.css"
import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import Loading from "../components/loading"
import DetailsCompra from "./DetailsCompras";
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



export default function Compras () {
    
    const {id} = useParams()

    const [compras, setCompras] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(app)

    const UserSubCollection = collection(db,`vendas/${id}/compras`)



    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserSubCollection);
                setCompras((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
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
        <p onClick={retornar} className={styles.btn_return}><span><FaCaretSquareLeft/></span>Retornar</p>
        <div className={`${styles.details} container`}>

                <div className={styles.header}>
                    {produtos && produtos.map(item => {
                            if (item.id == id) {
                                return (
                                    <div className={styles.header}>
                                        <div className={styles.title}>
                                            <h2>{item.comprador}</h2>
                                            <h4>{item.email}</h4>
                                        </div>
                                    </div>
                                )
                            }
                    })}
                </div>
            <ul className={styles.list}>
                {compras && compras.map(item => {
                    return (
                        <Link to={`/vendas/clientes/${id}/${item.id}`}>
                            <li className={styles.item} key={item.id}>
                                <div>
                                    <h4>{item.idcompra} compra</h4>
                                </div>
                            </li>
                        </Link>
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