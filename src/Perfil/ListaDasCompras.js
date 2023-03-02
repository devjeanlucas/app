import styles from "./ListaDasCompras.module.css"
import { useEffect, useState } from "react";
import { collection,  getFirestore, getDocs, doc, deleteDoc} from "@firebase/firestore";
import User from "../components/Hooks/User"
import App from "../components/Hooks/App"
import Loading from "../components/loading";
import CarrinhoVazio from "../components/CarrinhoVazio"
import BoxPesquisaCompras from "./BoxPesquisaCompras";




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

    <div >
        <div className={styles.container}>
            <label className={styles.title}>Id Compra</label>
            <input type="text"/>
            <label className={styles.title}>Data</label>
            <input type="date"/>
        </div>
        <BoxPesquisaCompras/>
    </div>


    }
    {!loader && 
        <div className={styles.cont_loader}>
            <Loading/>
        </div>}
        
    </>
    )
}