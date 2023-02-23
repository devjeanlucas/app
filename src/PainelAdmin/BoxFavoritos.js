import styles from "./BoxOptions.module.css"
import { collection,  getFirestore, getDocs, setDoc, doc} from "@firebase/firestore";
import { useEffect, useState } from "react";
import '@firebase/firestore';
import App from '../components/Hooks/App';
import {FaSearch} from "react-icons/fa"



export default function BoxFavoritos () {
    
    const db = getFirestore(App)
    const UserCollection = collection(db, "favoritos")
    const [produtos, setProdutos] = useState([])


    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
    
                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])


    var totalFavoritos = produtos && produtos.length

    return (
        <>
        <div className={styles.container}>
            <p>1º - </p>
            <p>2º - </p>
            <p>3º - </p>
            <div className={styles.li}>
                <h4>Total de curtidas</h4>
                <h4>{totalFavoritos}</h4>
            </div>
        </div>
        </>
    )
}