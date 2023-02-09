import styles from "./stylesBox.module.css"
import { Link } from "react-router-dom"
import Loading from "../components/loading"


import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };
const app = firebase.initializeApp(firebaseConfig)

export default function All () {
    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(app)
    const UserCollection = collection(db, "produtos")
  
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                setLoader(true)
                    };
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])
    
    return (
        <>
        <ul className={`row ${styles.container_list}`}>
            <p>oi</p>
            {produtos && produtos.map(prod => {
                return(
                    <li className="col-12 col-sm-6 col-md-6 col-lg-4" key={prod.id}>
                        <div className={styles.box} >
                            <Link to={`/produtos/${prod.id}`}>
                                <div className={styles.contImagem}>
                                    <img src={prod.imagem} className={styles.imagem}/>
                                </div>
                            </Link>
                            <div className={styles.box_info}>
                                <div>
                                    <h4>{prod.nome}</h4>
                                    <p>R${prod.preco},00</p>
                                </div>
                            </div>
                        </div>
                    </li>
                )

            })}

            {!loader && 
            <div className={styles.cont_loader}>
                <Loading/>
            </div>
            }
            

            
        </ul>
        </>
    )
}