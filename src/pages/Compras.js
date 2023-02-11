
import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import "./Compras.css"
import {FaAngleDown} from "react-icons/fa"
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


export default function Compras () {

    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(app)
    const UserCollection = collection(db, "vendas")
  
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
    
    const [info, setInfo] = useState(false)

    
    return (
        <div>
            <div className="cont">
                <div className="header">
                    <h1>Minhas Vendas</h1>
                </div>
                <div className="body">
                    <ul>
                        {produtos && produtos.map(prod => {
                            return(
                                <li key={prod.id}>
                                    <div className='box_item'>
                                        <p>id: {prod.id}</p>
                                        <p>{prod.comprador}</p>
                                        <p>{prod.email}</p>
                                        <FaAngleDown className='arrowdown' onClick={() => {setInfo(!info)}}/>
                                    </div>
                                    {info && 
                                        <div className='cont_info'>
                                            <ul>
                                                <li>
                                                    <div className='item'>
                                                        <div className='info'>
                                                            <p>{prod.Produto}</p>
                                                            <p>qtd:</p>
                                                            <p>x{prod.qtd}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    }
                                </li>
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
        </div>
    )
}