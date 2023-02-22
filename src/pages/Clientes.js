
import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import "./Clientes.css"
import Loading from "../components/loading"
import { Link } from 'react-router-dom';
import { FaRegGrinWink } from 'react-icons/fa';
import {auth} from "../service/firebase"
import App from '../components/Hooks/App';
import User from '../components/Hooks/User';


export default function Compras () {

    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(App)
    const UserCollection = collection(db, "testeusers")
    let index = produtos.findIndex(val => val.id == 1);

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

    console.log(User)
    return (
        <div>
            <div className="cont">
                <div className="header">
                    <h1>Minhas Vendas</h1>
                </div>
                <div className="body">
                    <ul>
                        {User && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" ? 
                            <div className='list'>
                                {produtos  && produtos.map((prod, index)=> {
                                    if (produtos.length > 1) {
                                        return (
                                            <Link to={`/vendas/detailsvenda/${prod.id}`}>
                                            <li key={prod.id} className="box">
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