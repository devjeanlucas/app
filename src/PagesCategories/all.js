import styles from "./stylesBox.module.css"
import { Link } from "react-router-dom"
import Loading from "../components/loading"

import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection,  getFirestore, getDocs, setDoc, doc} from "@firebase/firestore";
import User from "../components/Hooks/User";
import { FaPenSquare, FaPlusCircle } from "react-icons/fa";
import App from "../components/Hooks/App";
import ButtonFavorite from "../components/ButtonFavorite";
import AddOrEdit from "../PainelAdmin/AddOrEdit";



export default function All () {
    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(App)
    const[ação,setAção] = useState()
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
        var sugestao = Math.ceil(Math.random() * valorMaximo); 
        while (sorteados.indexOf(sugestao) >= 0) { 
            sugestao = Math.ceil(Math.random() * valorMaximo);
        }
        sorteados.push(sugestao); 
        setSeed(sugestao)
    }

    const[produto, setProduto] = useState()

    
    return (
        <>
        {User[0] && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" && 
        <div>
            <button 
            className={styles.button_add}
            onClick={()=> setAção('adicionar')}
            type="button" data-bs-toggle="modal" data-bs-target="#ModalEdit"
            >
                <FaPlusCircle className={styles.icon_more}/>
                adicionar novo
            </button>
        </div>
        }
        <ul className={`row ${styles.container_list}`}>
            {produtos && produtos.map(prod => {
                return(
                    <li className="col-6 col-sm-6 col-md-6 col-lg-4" key={prod.id} id={prod.id}>
                        {User[0] && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" ? 
                        <FaPenSquare type="button" data-bs-toggle="modal" data-bs-target="#ModalEdit" onClick={()=> {
                            setProduto(prod)
                            setAção("editar")
                            }} className={styles.icon_edit}/>:<></>}
                        <div className={styles.box} >
                            <Link to={`/produtos/${prod.iden}`}>
                                <div className={styles.contImagem}>
                                    <img src={prod.imagem} className={styles.imagem}/>
                                </div>
                            </Link>

                            <div className={styles.box_info}>
                                    <div className={styles.info}>

                                        <div className={styles.info_item}>

                                            <div className={styles.cont_name_item}>
                                                <h4>{prod.nome}</h4>
                                                <div className={styles.btn_favorite}
                                                    onClick={reset}>
                                                    <ButtonFavorite id={prod.id} prod={prod} key={seed} />
                                                </div>
                                            </div>

                                            <div className={styles.line}></div>
                                            <div className={styles.cont_price_item}>
                                                <p>R${prod.preco},00 <span className={styles.avista}>à vista</span></p>
                                            </div>
                                        </div>
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

        <div className="modal fade" id="ModalEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog modal-md`}>
                <div className="modal-content">
                    <AddOrEdit 
                    type="button"
                    dismiss="modal"
                    aria_label="Close"
                    produto = {produto && produto}
                    ação={ação}
                    />
                </div>
            </div>
        </div>
        </>
    )
}