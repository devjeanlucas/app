import { FaRegHeart, FaRegSave, FaTimes } from "react-icons/fa"
import styles from "./AddOrEdit.module.css"
import '@firebase/firestore';
import {  getFirestore, doc, updateDoc, collection, getDocs, setDoc, deleteDoc} from "@firebase/firestore";
import { useEffect, useState } from "react";
import App from "../components/Hooks/App";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../components/loading"


export default function AddOrEdit (props) {

    const [nome, setNome] = useState()
    const [preco, setPreco] = useState()
    const [estoque, setEstoque] = useState()
    const [imagem, setImagem] = useState()
    const [Categorie, setCategorie]= useState()
    const [marca, setMarca] = useState()
    const [Material, setMaterial] = useState()
    const [confirmDelete, setConfirmDelete] = useState()

    const[produtos, setProdutos] = useState()
    const db = getFirestore(App);
    const FavoriteCollection = collection(db, "produtos");

    useEffect(()=> {
        const getFavorites = async()=> {
            const dataSub = await getDocs(FavoriteCollection);
            setProdutos((dataSub.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        }
        getFavorites()
    }
    ,[])

   
    async function editaItem (id) {
        
        await updateDoc(doc(db, "produtos", id), {
            nome: !nome ? props.produto.nome : nome.trim()
        });
        await updateDoc(doc(db, "produtos", id), {
            preco: !preco ? props.produto.preco : preco
        });
        await updateDoc(doc(db, "produtos", id), {
            estoque:!estoque ? props.produto.estoque : estoque
        });
        await updateDoc(doc(db, "produtos", id), {
            imagem:!imagem ? props.produto.imagem : imagem
        });
        toast.success("Item Adicionado com sucesso!")

        window.location.reload()
    }


    var listIDs = []
    
    produtos && produtos.map(item => listIDs.push(parseInt(item.id)))
    
    var max = listIDs.reduce(function(a, b) {
        return Math.max(a, b);
    }, -Infinity);
    
    var id = max + 1
    

    async function addItem () {

        if (!imagem || !nome || !preco || !marca || !Material || !estoque) {
            return toast.error("Todos os campo devem ser preenchidos")
        }
        await setDoc(doc(db, 'produtos', `${id}`), {
            imagem,
            nome:nome.trim(),
            preco:parseInt(preco),
            marca,
            Material,
            estoque: parseInt(estoque),
            iden:id,
            Categorie
            });
        toast.success("Item adicionado com sucesso!")
    }

    function deletar () {
        if (confirmDelete == props.produto.nome) {
            const Doc = doc(db, 'produtos', `${props.produto.id}`);
            deleteDoc(Doc)
            toast.success("Item deletado com sucesso")
        } else {
            toast.error("O nome inserido não confere com o produto")
        }

        
    }
    





    return (
        <>
        {props.ação == "adicionar" && 
        <div className={styles.container}>
                
                <div className={styles.cont_title}>
                    <p><strong>adicionando:</strong></p>
                    <FaTimes
                        type={props.type}
                        data-bs-dismiss={props.dismiss}
                        aria-label={props.arial_label}
                    />
                </div>
                <div className={styles.visualizar}>
                    <div className={styles.item}>
                        <div>
                            <img src={imagem}/>
                        </div>
                        <div className={styles.body_visualizar}>
                            <div className={styles.info}>
                                <h4>{nome}</h4>
                                <p>R$ {preco}</p>
                            </div>
                            <div>
                                <FaRegHeart className={styles.icon_heart}/>
                            </div>
                        </div>
                    </div>
                </div>


              <form>
                <div className={styles.container_add}>
                    <label>Imagem</label>
                    <input type="text" onChange={(el)=>{setImagem(el.target.value)}}/>
                   
                    <label>Nome</label>
                    <input type="text" onChange={(el)=>{setNome(el.target.value)}}/>

                    <label>Preço</label>
                    <input type="number" onChange={(el)=>{setPreco(el.target.value)}}/>
             
                    <label>Categoria</label>
                    <select onChange={(el)=> setCategorie(el.target.value)} className={styles.select}>
                        <option>tapetes</option>
                        <option>vasos</option>
                        <option>cortinas</option>
                        <option>outro</option>
                    </select><br/>

                    <label>Marca</label>
                    <input type="text" onChange={(el)=>{setMarca(el.target.value)}}/>

                    <label>Material</label>
                    <input type="text" onChange={(el)=>{setMaterial(el.target.value)}}/>

                    <label>Estoque</label>
                    <input type="number" onChange={(el)=>{setEstoque(el.target.value)}}/>


                </div>
                <button className={styles.btn_add} onClick={(event)=> {event.preventDefault(); addItem()}}>Adicionar</button>
              </form>
        </div>
        }


        {props.ação == "editar" && 
        props.produto && 
        <div className={styles.container}>
            <form>
                <div className={styles.cont_img}>
                    <img src={props.produto.imagem}/>
                </div>
                <div className={styles.body}>
                    <div>
                        <label>Nome</label>
                        <input type="text" placeholder={props.produto.nome} onChange={(el)=>{setNome(el.target.value)}}/>
                    </div>
                    <div>
                        <label>Preço</label>
                        <input type="number" placeholder={"R$" + props.produto.preco} onChange={(el)=>{setPreco(el.target.value)}}/>
                    </div>
                    <div>
                        <label>Imagem</label>
                        <input type="text" placeholder={props.produto.imagem} onChange={(el)=>{setImagem(el.target.value)}}/>
                    </div>
                    <div>
                        <label>Estoque</label>
                        <input type="number" placeholder={props.produto.estoque} onChange={(el)=>{setEstoque(el.target.value)}}/>
                    </div>
                    <div className={styles.cont_button}>
                        <button 
                        type={props.type}
                        data-bs-dismiss={props.dismiss}
                        aria-label={props.arial_label}
                        className={styles.cancel}
                        >cancelar</button>

                        <button onClick={(event)=>{
                            event.preventDefault()
                            editaItem(props.produto.id)
                            }}><FaRegSave className={styles.icon_save}/>salvar
                        </button>
                    </div>
                    <div className={styles.delete}>
                        <h4 className={styles.danger_text}>Zona de perigo</h4>
                        <p>deletar item: <strong>{props.produto.nome}</strong></p>

                        <input type="text" placeholder={props.produto.nome}
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
        }
        
        <ToastContainer/>
        </>
    )
}