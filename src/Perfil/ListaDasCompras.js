import styles from "./ListaDasCompras.module.css"
import { useEffect, useState } from "react";
import { collection,  getFirestore, getDocs, doc, deleteDoc} from "@firebase/firestore";
import User from "../components/Hooks/User"
import App from "../components/Hooks/App"
import Loading from "../components/loading";
import CarrinhoVazio from "../components/CarrinhoVazio"
import BoxPesquisaCompras from "./BoxPesquisaCompras";
import moment from "moment";




export default function ListaDasCompras () {


    const db = getFirestore(App)
    const UserCollection = collection(db, "testeusers")

    const [produtos, setProdutos] = useState([])
    const [busca, setBusca] = useState({})
    const [loader, setLoader] = useState(false)
    const [status, setStatus] = useState()
    const [date, setDate] = useState()
    const [idPag, setidPag] = useState()


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

        <div>
        <div className={styles.container}>
            <div className={`${styles.no_padding_no_margin} row`}>
                <div className={`${styles.no_padding_no_margin} col-md-11`}>
                    <div className={`${styles.no_padding_no_margin} row`}>
                        <div className={`${styles.no_padding_no_margin} col-sm-6`}>
                            <div className={styles.idPag_box}>
                                <label className={styles.title}>Nº de compra</label>
                                <input type="text" onChange={(el)=> setidPag(el.target.value)}/>
                            </div>
                            <div className={`${styles.no_padding_no_margin} row`}>
                                <div className={`${styles.no_padding_no_margin} col-sm-6`}>
                                    <div className={styles.idPag_box}>
                                        <label className={styles.title}>Filtrar por data</label>
                                        <input type="date" onChange={(el)=> setDate(el.target.value)}/>
                                    </div>
                                </div>
                                <div className={`${styles.no_padding_no_margin} col-sm-6`}>
                                    <div className={styles.box_select}>
                                        <label className={styles.title}>Filtrar por status</label><br/>
                                        <select onChange={(el)=> setStatus(el.target.value)}>
                                            <option>--</option>
                                            <option>concluido</option>
                                            <option>pending</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-md-2 ${styles.cont_button} ${styles.no_padding_no_margin}`}>
                    <button onClick={()=> {setBusca({
                        idPag,
                        date,
                        status
                    })}}>pesquisar</button>
                </div>
            </div>
        </div>
        <BoxPesquisaCompras busca={busca}/>
    </div>


    }
    {!loader && 
        <div className={styles.cont_loader}>
            <Loading/>
        </div>}
        
    </>
    )
}