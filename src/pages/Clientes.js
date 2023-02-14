
import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import "./Clientes.css"
import BoxCompras from "../components/BoxCompras"
import Loading from "../components/loading"
import { Link, useParams } from 'react-router-dom';


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

    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(app)
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
        <div>
            <div className="cont">
                <div className="header">
                    <h1>Minhas Vendas</h1>
                </div>
                <div className="body">
                    <ul>
                        {produtos && produtos.map((prod, index)=> {
                            return(
                                <Link to={`/vendas/detailsvenda/${prod.id}`}>
                                    <li key={prod.comprador} className="box">
                                    <div className='title'>
                                        <div>
                                            {index}
                                        </div>
                                        <div>{prod.comprador}</div>
                                        <div>{prod.email}</div>
                                    </div>
                                                                </li>
                                </Link>
                            )

                        })}
                    </ul>

            {!loader && 
            <div>
                <Loading/>
            </div>
            }
                    
                </div>
            </div>
            {/*<Link to={`/vendas/clientes/${prod.id}`}>
                                    <li key={prod.comprador} className="box">
                                        <div className='title'>
                                            <div>
                                                {prod.id}
                                            </div>
                                            <div>{prod.comprador}</div>
                                            <div>{prod.email}</div>
                                        </div>
                                    
                                    
                                    </li>
        </Link>*/}
        </div>
        
    )
}