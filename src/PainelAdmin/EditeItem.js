import { FaRegSave, FaTimes } from "react-icons/fa"
import styles from "./AddOrEdit.module.css"
import '@firebase/firestore';
import { doc, updateDoc,  deleteDoc, getFirestore, collection, getDocs} from "@firebase/firestore";

import { useState, useEffect } from "react";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from "../components/Hooks/App";
import { Link, useParams } from "react-router-dom";
import User from "../components/Hooks/User";


export default function EditeItem (props) {


    const {id} = useParams()
    const [nome, setNome] = useState()
    const [preco, setPreco] = useState()
    const [estoque, setEstoque] = useState()
    const [imagem, setImagem] = useState()
    const [Categorie, setCategorie]= useState()
    const [marca, setMarca] = useState()
    const [material, setMaterial] = useState()
    const [confirmDelete, setConfirmDelete] = useState()
    const db = getFirestore(App);

    const [produtos, setProdutos] = useState([])
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


    async function editaItem (id) {
            await updateDoc(doc(db, "produtos", id), {
                nome: !nome ? produtos[id].nome : nome.trim()
            });
            await updateDoc(doc(db, "produtos", id), {
                preco: !preco ? produtos[id].preco : preco
            });
            await updateDoc(doc(db, "produtos", id), {
                estoque:!estoque ? produtos[id].estoque : estoque
            });
            await updateDoc(doc(db, "produtos", id), {
                imagem:!imagem ? produtos[id].imagem : imagem
            });
            await updateDoc(doc(db, "produtos", id), {
                marca:!marca ? produtos[id].marca : marca
            });
            await updateDoc(doc(db, "produtos", id), {
                material:!material ? produtos[id].Material : material
            });
            await updateDoc(doc(db, "produtos", id), {
                categorie:!Categorie ? produtos[id].categorie : Categorie
            });
            toast.success("Item Adicionado com sucesso!")
        window.location.reload()
    }
    
    function deletar () {
        if (confirmDelete == produtos[id].nome) {
            const Doc = doc(db, 'produtos', `${produtos[id].id}`);
            deleteDoc(Doc)
            toast.success("Item deletado com sucesso")
        } else {
            toast.error("O nome inserido não confere com o produto")
        }

        
    }



    return (
        <>
        {produtos.length > 0  && User && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13"  && produtos.map(item => {
            if (id-1 == item.id-1)
            return (
                <>
                <div className={styles.container}>
                    <form>
                        <div className={styles.cont_img}>
                            <img src={item.imagem}/>
                        </div>
                        <div className={styles.body}>
                            <div>
                                <label>Nome</label>
                                <input type="text" placeholder={item.nome} onChange={(el)=>{setNome(el.target.value)}}/>
                            </div>
                            <div>
                                <label>Preço</label>
                                <input type="number" placeholder={"R$" + item.preco} onChange={(el)=>{setPreco(el.target.value)}}/>
                            </div>
                            <div>
                                <label>Imagem</label>
                                <input type="text" placeholder={item.imagem} onChange={(el)=>{setImagem(el.target.value)}}/>
                            </div>
                            <label>Categoria</label>
                            <select onChange={(el)=> setCategorie(el.target.value)} className={styles.select}>
                                <option>{item.categorie}</option>
                                <option>vasos</option>
                                <option>cortinas</option>
                                <option>outro</option>
                            </select><br/>

                            <label>Marca</label>
                            <input type="text" onChange={(el)=>{setMarca(el.target.value)}} placeholder={item.marca}/>

                            <label>Material</label>
                            <input type="text" onChange={(el)=>{setMaterial(el.target.value)}} placeholder={item.material}/>

                            <div>
                                <label>Estoque</label>
                                <input type="number" placeholder={item.estoque} onChange={(el)=>{setEstoque(el.target.value)}}/>
                            </div>
                            <div className={styles.cont_button}>

                                <button onClick={(event)=>{
                                    event.preventDefault()
                                    editaItem(item.id)
                                }}><FaRegSave className={styles.icon_save}/>salvar
                                </button>
                                <Link to="/estoque/todos"><button className={styles.cancel}>Retornar</button></Link>

                            </div>
                            <div className={styles.delete}>
                                <h4 className={styles.danger_text}>Zona de perigo</h4>
                                <p>deletar item: <strong>{item.nome}</strong></p>

                                <input type="text" placeholder={item.nome}
                                onChange={(ev)=> setConfirmDelete(ev.target.value)}/>

                                <p>Para deletar este item escreva o nome do mesmo, confirmando-o.</p>

                                <div className={styles.cont_button_delete}>
                                    <button className={styles.btn_deletar} onClick={(event)=> 
                                        {
                                            event.preventDefault();
                                            deletar()
                                        }}>
                                    deletar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                </>
            )
        })
        }
        <ToastContainer/>
        </>
    )
}