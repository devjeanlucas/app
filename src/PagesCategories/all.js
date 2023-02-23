import styles from "./stylesBox.module.css"
import { Link } from "react-router-dom"
import Loading from "../components/loading"

import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection,  getFirestore, getDocs, setDoc, doc} from "@firebase/firestore";

import App from "../components/Hooks/App";
import ButtonFavorite from "../components/ButtonFavorite";



export default function All () {
    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(App)
    const UserCollection = collection(db, "produtos")

  
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
    




    var sorteados = [];
    var valorMaximo = 1000;

    const [seed,setSeed] = useState()
    const reset = () => {
        var sugestao = Math.ceil(Math.random() * valorMaximo); // Escolher um numero ao acaso
        while (sorteados.indexOf(sugestao) >= 0) {  // Enquanto o numero já existir, escolher outro
            sugestao = Math.ceil(Math.random() * valorMaximo);
        }
        sorteados.push(sugestao); // adicionar este numero à array de numeros sorteados para futura referência
        setSeed(sugestao)
        console.log(seed)
    }

    
    return (
        <>
        <ul className={`row ${styles.container_list}`}>
            {produtos && produtos.map(prod => {
                return(
                    <li className="col-6 col-sm-6 col-md-6 col-lg-4" key={prod.id} id={prod.id}>
                        <div className={styles.box} >
                            <Link to={`/produtos/${prod.iden}`}>
                                <div className={styles.contImagem}>
                                    <img src={prod.imagem} className={styles.imagem}/>
                                </div>
                            </Link>
                            <div className={styles.box_info}>
                                <div className={styles.info}>
                                        

                                    <div className={styles.btn_favorite}
                                    onClick={reset}>
                                        <ButtonFavorite id={prod.id} prod={prod} key={seed} />
                                    </div>


                                    <h4>{prod.nome}</h4>
                                    <p>R${prod.preco},00</p>
                                </div>
                            </div>
                        </div>
                    </li>
                )

            })}

            {!loader && 
            <div className={styles.cont_loader}>
                <Loading/>
            </div>
            }
            

            
        </ul>
        </>
    )
}