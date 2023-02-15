import styles from "./FormularioCarrinho.module.css"
import { Link, useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import { auth } from "../service/firebase"
import firebase from 'firebase/compat/app';
import '@firebase/firestore';
import { collection,  getFirestore, addDoc, getDocs, setDoc, doc} from "@firebase/firestore";
import Congratulation from "./Congratulations";

const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };
const app = firebase.initializeApp(firebaseConfig)



export default function ConfirmaCarrinho () {
    
    const {id} = useParams()
    

    return (
        <>
        <div className="container">
            <h3>Você confirma os itens que estão na sacola?</h3>
            <div>
                
                <button className={styles.btn_confirm} id="confirm">{<span>confirmar</span>}</button>
                <button className={styles.btn_cancel}>Cancelar</button>
            </div>
        </div>
        <div className={styles.navigation}>
            <Link to="/checkout/usuario"><button>Voltar</button></Link>
            <Link to={`/${id}/parabens`}><button>Avançar</button></Link>
        </div>
        </>
    )
}