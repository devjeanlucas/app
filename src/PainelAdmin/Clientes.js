import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import styles from "./Clientes.module.css"
import Loading from "../components/loading"
import { Link } from 'react-router-dom';
import { FaRegGrinWink } from 'react-icons/fa';
import App from '../components/Hooks/App';
import User from '../components/Hooks/User';
import BoxOptions from "./BoxOptions"
import FormPesquisa from "./FormularioPesquisa";


export default function Compras () {

    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(App)
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
            {User.length > 0 && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" ?
                <div>
                    <div className={styles.container}>
                        <FormPesquisa/>
                    </div>
                    <BoxOptions/>
                </div>
            :
            <div>
                <h2>Permissões de Administrador para continuar</h2>
            </div>}
            
        </>
        
    )
}