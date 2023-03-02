import styles from "./BoxPesquisaCompras.module.css"
import { useEffect, useState } from "react";
import { collection,  getFirestore, getDocs, doc, deleteDoc} from "@firebase/firestore";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"
import {FaExclamationCircle,FaCheck,FaCircle,FaQuestion, FaSearch, FaCheckCircle} from "react-icons/fa"
import User from "../components/Hooks/User"
import App from "../components/Hooks/App"
import Loading from "../components/loading";
import CarrinhoVazio from "../components/CarrinhoVazio"
import moment from "moment";


export default function BoxPesquisaCompras () {


    const db = getFirestore(App)
    const UserCollection = collection(db, "testeusers")

    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)

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


    produtos.sort(function(a, b) {if(a.horario > b.horario) {return -1;} else {return true;}})

 
    return (
    <>{produtos && produtos.length <= 1 ? 
    <>
        <CarrinhoVazio text="Ainda não tem nenhum compra"/>
    </>: User.length > 0 &&



    <div className={styles.container}>
        <h4>Minhas Compras</h4>
        <ul className={styles.list}>
            {produtos && produtos.map(dados => {
                if (User[0].id == dados.iduser)
                return (
                    <li key={dados.id}>
                        <div>
                            <p className={styles.date}>{dados.data}</p>
                            <div className={styles.item}>
                                <div className={styles.header}>
                                    <h4></h4>
                                </div>
                                <div className={styles.body}>

                                    <p><span className={dados.satus == "pending" ? `${styles.margin_right} ${styles.pending}` : `${styles.margin_right} ${styles.concluido}`}>{dados.status == "pending"? <FaExclamationCircle/> : <FaCheckCircle/>}
                                    </span><span className={styles.margin_right}>Pedido</span>
                                    <span className={dados.satus == "pending" ? `${styles.margin_right} ${styles.pending}` : `${styles.margin_right} ${styles.concluido}`}>{dados.status}</span>
                                     &bull; N&ordm; {dados.idPagamento}</p>
                                </div>
                                <div className={styles.line}></div>
                                <div className={styles.footer}>
                                    <div className={styles.cont_buttons}>
                                        <button>Ajuda</button>
                                        <Link to={`/Home/MinhasCompras/DetalhesDaCompra/${dados.id}`}><button>Ver Detalhes</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>




    }
    {!loader && 
        <div className={styles.cont_loader}>
            <Loading/>
        </div>}
        
    </>
    )
}