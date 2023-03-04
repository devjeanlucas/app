import { Link } from "react-router-dom"
import styles from "./MenuMobile.module.css"
import User from "../components/Hooks/User"
import { FaPowerOff } from "react-icons/fa"
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import App from "../components/Hooks/App";



export default function MenuMobile () {
    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, "produtos")
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h4>{User[0] && User[0].name}</h4>
                    <p>{User[0] && User[0].email}</p>
                    {User[0] && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" &&
                        <div>
                            <span><FaPowerOff/>Admin </span>
                            <Link to="/vendas/clientes">Vendas</Link>
                        </div>
                    }
                </div>
                <ul className={styles.categories}>
                    <Link to="/Perfil">Perfil</Link>
                    <Link to={"Home/MeusFavoritos"}>Meus Favoritos</Link>
                    <Link to={`Home/MinhasCompras/todas`}>Minhas Compras</Link>
                    <details>
                    <summary className={styles.item}>Categorias</summary>
                        <ul className={styles.list_categories}>
                            {produtos && produtos.map(item => {
                                return (
                                    <Link to={`/estoque/${item.categorie}`}>
                                        <li key={item.id} className={styles.categorie}>
                                            <p>{item.categorie}</p>
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>
                    </details>
                    <Link>Ajuda</Link>
                </ul>
            </div>
        </div>
    )
}