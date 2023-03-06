import { Link } from "react-router-dom"
import styles from "./MenuMobile.module.css"
import User from "../components/Hooks/User"
import { FaAngleRight, FaPowerOff } from "react-icons/fa"
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import App from "../components/Hooks/App";



export default function MenuMobile (props) {
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
        <div className={` ${styles.container}`}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.name_box}><FaAngleRight
                    type={props.type}
                    data-bs-dismiss={props.data_bs_dismiss}
                    aria-label={props.aria_label}
                    /><h4> {User[0] && User[0].name}</h4> </div>
                    <p>{User[0] && User[0].email}</p>
                    {User[0] && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" &&
                        <div className={styles.admin}>
                            <span><FaPowerOff/> Admin </span>
                            <Link to="/vendas/clientes" 
                            type={props.type}
                            data-bs-dismiss={props.data_bs_dismiss}
                            aria-label={props.aria_label}>Vendas</Link>
                        </div>
                    }
                </div>
                <ul className={styles.categories}>
                    
                        
                            <li
                            type={props.type}
                            data-bs-dismiss={props.data_bs_dismiss}
                            aria-label={props.aria_label}
                            >
                                <Link to="/Perfil"
                                >Perfil</Link>
                            </li>
                            

                            <li
                            type={props.type}
                            data-bs-dismiss={props.data_bs_dismiss}
                            aria-label={props.aria_label}
                            >
                                <Link to="Home/MeusFavoritos">Meus Favoritos</Link>
                            </li>
                            <li
                            type={props.type}
                            data-bs-dismiss={props.data_bs_dismiss}
                            aria-label={props.aria_label}
                            >
                                <Link to={`Home/MinhasCompras`}>Minhas Compras</Link>
                            </li>

                    <details>
                        <summary className={styles.item}>Categorias</summary>
                        <ul className={styles.list_categories}>
                            {produtos && produtos.map(item => {
                                return (
                                        <Link to={`/estoque/${item.categorie}`}>
                                            <li
                                            className={styles.categorie}
                                            type={props.type}
                                            data-bs-dismiss={props.data_bs_dismiss}
                                            aria-label={props.aria_label}
                                            key={item.id}
                                            >
                                                <p>{item.categorie}</p>
                                            </li>
                                        </Link>
                                )
                            })}
                        </ul>
                    </details>
                    <li
                    type={props.type}
                    data-bs-dismiss={props.data_bs_dismiss}
                    aria-label={props.aria_label}
                    >
                        <Link>Ajuda</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}