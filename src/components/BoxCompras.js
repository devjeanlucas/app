import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import Loading from "../components/loading"


const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };

const app = firebase.initializeApp(firebaseConfig)



export default function Box (props) {

    const db = getFirestore(app)

    const [subCollection, setSubCollection] = useState([])
    


    const mostraDados = (compra) => {
        const UserSubCollection = collection(db, `vendas/${props.id}/compras/${compra}/total`)
        try {
            const getUsers = async() => {
                const dataSub = await getDocs(UserSubCollection);
                setSubCollection((dataSub.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                console.log(subCollection)
            }
            getUsers()
        } catch(e) {
            console.log("erro")
        }
    }
    





    return (
        <>
            <div>{props.cliente}</div>
            <ul className='container'>
                {props.list && props.list.map(item =>
                    {
                        return (
                            <li key={item.id} onClick={(el) => {
                                mostraDados(el.target.innerText)
                                }}>
                                <p>{item.idcompra}</p>
                            </li>
                        )
                })}
            </ul>
        </>
        
    )
}