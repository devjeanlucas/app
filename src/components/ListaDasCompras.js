import styles from "./MinhasCompras.module.css"
import { useEffect, useState } from "react";
import {firebase, auth} from "../service/firebase"
import { collection, getDocs, getFirestore, addDoc} from "@firebase/firestore";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"
import {FaExclamation,FaCheck,FaCircle,FaQuestion} from "react-icons/fa"
import User from "../components/Hooks/User"
import App from "../components/Hooks/App"
import Loading from "./loading";

export default function ListaDasCompras () {


    const db = getFirestore(App)
    const UserCollection = collection(db, "testeusers")

    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)

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
    <>{produtos && produtos.length <= 1 ? 

    <>

    </>:

    <div className={"col-12 col-sm-12 col-md-12"}>
            {produtos && produtos.map(item => {
                if (item.iduser === User[0].id) {
                    return (
                        <li key={item.id} >
                            <div className={styles.cont_compra}>
                                    <div className={`row ${styles.header}`}>
                                        <div className="col-2">
                                            <img src={logo} alt="logo jb" className={styles.logo}/>
                                        </div>
                                    <div className="col-4">
                                        <div className={styles.cont_horario}>
                                            <p><span>data: {item.data}</span></p>
                                            <p><span>hora: {item.horario}</span></p>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className={styles.content_compra}>
                                            <p className={styles.status}>{item.status == "pending" ? <FaExclamation className={styles.exclamation}/>: <FaCheck className={styles.check}
                                            />}
                                            Pedido: {item.status == "pending" ? 
                                            <span className={styles.pending}>pendente</span>:
                                            <span className={styles.concluido}>concluído</span>} 

                                            <FaCircle className={styles.separator}/> <span className={styles.number_ped}>Nº {item.idPagamento}</span></p>
                                        </div>
                                        <div className={`row ${styles.cont_buttons}`}>
                                            <div className="col-6">
                                                <button><span><FaQuestion/></span> Ajuda</button>
                                            </div>
                                            <div className="col-6">
                                            <Link to={`/Home/MinhasCompras/DetalhesDaCompra/${item.id}`} className={styles.link}><button>Ver compra</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                }
                !loader && 
                    <div className={styles.cont_loader}>
                        <Loading/>
                    </div>
                
            })}
        </div>
    }
        
    </>
    )
}