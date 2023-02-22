
import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import "./Clientes.css"
import Loading from "../components/loading"
import { Link } from 'react-router-dom';
import { FaRegGrinWink } from 'react-icons/fa';
import {auth} from "../service/firebase"


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

    const [user, setUser] = useState();


    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
                const {uid, displayName, photoURL, email} = user
                if (!displayName || !photoURL) {
                    throw new Error('Usuário sem Nome ou foto')
                }
                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName,
                    email
                })
            }
        })
    }, [])

    
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
                        {user && user.id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" ? 
                            <div>
                                {produtos && produtos.map((prod, index)=> {
                                    if (produtos.length > 1) {
                                        return (
                                            <Link to={`/vendas/detailsvenda/${prod.id}`}>
                                            <li key={prod.comprador} className="box">
                                            <div className='title'>
                                                <div>
                                                    {index}
                                                </div>
                                                <div>{prod.comprador}</div>
                                                <div>{prod.status}</div>
                                            </div>
                                            </li>
                                        </Link>
                                        )
                                    }else {
                                        return (
                                            <h4 className="text_vazio">Por enquanto, ainda não há vendas <span><FaRegGrinWink/></span></h4>
                                        )
                                    }
                                })}
                            </div>
                        :<h3>Somente admin nesta página</h3>}
                        
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