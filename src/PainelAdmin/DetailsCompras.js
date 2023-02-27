import styles from "./DetailsCompras.module.css"
import App from '../components/Hooks/App';
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import { useEffect, useState } from "react";
import '@firebase/firestore';
import User from "../components/Hooks/User"
import { useParams } from "react-router-dom";

export default function DetalhesCompra() {


    const {id} = useParams()
    const [compra, setCompra] = useState([])
    const db = getFirestore(App)
    const UserSubCollection = collection(db, `testeusers/${id}/compra`)
    const UserCollection = collection(db, "testeusers")
    const [comprador, setComprador] = useState([])
    
    
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const datasub = await getDocs(UserSubCollection);
                setCompra((datasub.docs.map((doc) => ({...doc.data(), id: doc.id}))))

                const data = await getDocs(UserCollection);
                setComprador((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
    
                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])
    


    return (
        <>
        {User && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13"}
            <div className={styles.container}>
                <h3>Detalhes da Compra</h3>
                {comprador && comprador.map(dados=> {
                    if (dados.id == id) {
                        return (
                            <>
                            <div>
                                <p>Id.Pagamento: <span>{dados.idPagamento}</span></p>    
                            </div>
                            </>
                        )
                    }
                })}

                {compra && compra.map(item=> {
                    return (
                        <>
                            <div>
                                <h4>Resumo de compra</h4>
                                <div>
                                    <p>{item.produto}</p>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}