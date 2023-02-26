import { FaRegSave, FaTimes } from "react-icons/fa"
import styles from "./AddOrEdit.module.css"
import '@firebase/firestore';
import { doc, updateDoc,  deleteDoc, getFirestore} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from "../components/Hooks/App";


export default function EditeItem (props) {


    const [nome, setNome] = useState()
    const [preco, setPreco] = useState()
    const [estoque, setEstoque] = useState()
    const [imagem, setImagem] = useState()
    const [Categorie, setCategorie]= useState()
    const [marca, setMarca] = useState()
    const [material, setMaterial] = useState()
    const [confirmDelete, setConfirmDelete] = useState()
    const db = getFirestore(App);


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
        await updateDoc(doc(db, "produtos", id), {
            marca:!marca ? props.produto.marca : marca
        });
        await updateDoc(doc(db, "produtos", id), {
            material:!material ? props.produto.Material : material
        });
        await updateDoc(doc(db, "produtos", id), {
            categorie:!Categorie ? props.produto.categorie : Categorie
        });


        toast.success("Item Adicionado com sucesso!")

        window.location.reload()
    }
    console.log(Categorie)


    
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
        {props.produto && 
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
                    <label>Categoria</label>
                    <select onChange={(el)=> setCategorie(el.target.value)} className={styles.select}>
                        <option>{props.produto.categorie}</option>
                        <option>vasos</option>
                        <option>cortinas</option>
                        <option>outro</option>
                    </select><br/>

                    <label>Marca</label>
                    <input type="text" onChange={(el)=>{setMarca(el.target.value)}} placeholder={props.produto.marca}/>

                    <label>Material</label>
                    <input type="text" onChange={(el)=>{setMaterial(el.target.value)}} placeholder={props.produto.material}/>

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