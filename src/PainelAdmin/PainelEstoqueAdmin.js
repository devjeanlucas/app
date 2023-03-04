import styles from "./PainelEstoqueAdmin.module.css"
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import App from "../components/Hooks/App";
import { FaPenSquare } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function PainelEstoqueAdmin () {
    const [produtos, setProdutos] = useState([])
    const [value, setValue] = useState("")
    const [menor, setMenor] = useState()
    const [maior, setMaior] = useState()
    const [buscaqtd, setBuscaqtd] = useState(false)
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


    
    const filterList = produtos && produtos.filter((item) => {
        if (!buscaqtd) {
           return  item.nome.toLowerCase().includes(value.toLowerCase())
        } else {
           return item.qtd > maior
        }

    })

    


    return (
        <>
            <div>
                <div className={styles.container_title}>
                    <h3>Meu estoque</h3>
                    <input type="text" onChange={(el)=> setValue(el.target.value)}
                    placeholder="Pesquise seu produto aqui"
                    />
                    <div>
                        <p>Filtrar por quantidade</p>
                        <div className={styles.filter_qtd}>
                            <p>menor que:</p>
                            <input type="number" onChange={(el)=> setMenor(el.target.value)}/>
                            <p>maior que:</p>
                            <input type="number" onChange={(el)=> setMaior(el.target.value)}/>
                            <button className={styles.btn}
                            onClick={()=> setBuscaqtd(!buscaqtd)}
                            >buscar</button>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <ul className={styles.cont_estoque}>
                        {filterList && filterList.map(item => {
                            return (
                                <li className="row" key={item.id}>
                                    <div className="col-1">
                                        <div className={styles.cont_edit}>
                                            <Link to={`/edit/${item.id}`}><FaPenSquare/></Link>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <p><strong>{item.nome}</strong></p>
                                    </div>
                                    <div className="col-3">
                                        <div className={styles.cont_qtd}>
                                            <p>qtd: </p>
                                            <p className={styles.border}><strong 
                                            className={
                                                item.estoque <= 10 && styles.baixo ||
                                                item.estoque <= 40 && styles.medio ||
                                                item.estoque > 40 && styles.alto
                                            }
                                            >{item.estoque}</strong></p>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>


            </div>
        </>
    )
}