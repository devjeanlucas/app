import { FaRegHeart, FaRegSave, FaTimes } from "react-icons/fa"
import styles from "./Add.module.css"
import '@firebase/firestore';
import {  getFirestore, doc, updateDoc, collection, getDocs, setDoc, deleteDoc} from "@firebase/firestore";
import { useEffect, useState } from "react";
import App from "../components/Hooks/App";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddITem (props) {



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

    var listIDs = []
    
    produtos && produtos.map(item => listIDs.push(parseInt(item.id)))
    
    var max = listIDs.reduce(function(a, b) {
        return Math.max(a, b);
    }, -Infinity);
    
    var id = max + 1



    const [nome, setNome] = useState()
    const [preco, setPreco] = useState()
    const [estoque, setEstoque] = useState()
    const [imagem, setImagem] = useState()
    const [categorie, setCategorie]= useState()
    const [marca, setMarca] = useState()
    const [material, setMaterial] = useState()


    async function addItem () {

        if (!imagem || !nome || !preco || !marca || !material || !estoque) {
            return toast.error("Todos os campo devem ser preenchidos")
        }
        await setDoc(doc(db, 'produtos', `${id}`), {
            imagem,
            nome:nome.trim(),
            preco:parseInt(preco),
            marca,
            material,
            estoque: parseInt(estoque),
            iden:id,
            categorie
            });
        toast.success("Item adicionado com sucesso!")
    }
    
    
    return (
        <>
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
                            <img src={imagem}/>
                        <div className={styles.body_visualizar}>

                            <div className={styles.info}>
                                <h4 className={styles.nome}>{nome}</h4>
                                <FaRegHeart className={styles.icon_heart}/>
                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.cont_price}>
                                <p className={styles.price}>{preco ? "R$ "+ preco+",00":"R$ 0,00"}</p>
                                <p className={styles.avista}>à vista</p>
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
                        <option>--</option>
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
        <ToastContainer/>
        </>
    )
}