import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { Link, useParams } from 'react-router-dom';
import {firebase, auth} from "../service/firebase"
import styles from "./DetailsMinhaCompra.module.css"
import User from "../components/Hooks/User";
import App from "../App";


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
    


    return (
        <>

        <div className={styles.container}>
            <div className={styles.header}>
            <h4>Detalhes da Compra</h4>
            <ul className={styles.cont_info_compra}>
            {details && details.map(dados => {
                return (
                    <li className="row">
                            <div className="col-1">
                                <p>{dados.qtd}x</p>
                            </div>
                            <div className="col-8">
                                <p>{dados.produto}</p>
                            </div>
                            <div className="col-2">
                                <p>R$ {dados.preço.toFixed(2)}</p>
                            </div>
                    </li>
                )
            })}
            </ul>
            <Link to="/Home/MinhasCompras/todas"><button className={styles.btn_return}>retornar</button></Link>
            </div>
        </div>
        </>
    )
}