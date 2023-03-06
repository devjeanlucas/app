import { FaRegHeart, FaRegSave, FaTimes } from "react-icons/fa"
import styles from "./Add.module.css"
import '@firebase/firestore';
import {  getFirestore, doc,  collection, getDocs, setDoc, deleteDoc} from "@firebase/firestore";
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
    const [descrição, setDescrição] = useState()
    const [categorie, setCategorie]= useState()
    const [marca, setMarca] = useState()
    const [material, setMaterial] = useState()
    const [Outro, setSelectOutro] = useState(false)


    async function addItem () {

        if (!imagem || !nome || !preco || !marca || !material || !estoque) {
            return toast.error("Todos os campo devem ser preenchidos")
        }
        await setDoc(doc(db, 'produtos', `${id}`), {
            imagem: imagem.trim(),
            nome:nome.trim(),
            preco:parseInt(preco),
            marca:marca.trim(),
            material:material.trim(),
            estoque: parseInt(estoque),
            iden:id,
            categorie:categorie.trim(),
            descrição:descrição.trim()
            });
        toast.success("Item adicionado com sucesso!")
        window.location.reload()
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
                    <div className={styles.cont_select}>
                        <div className={styles.select}>
                            <select onChange={(el)=> setCategorie(el.target.value)} className={styles.select}>
                                <option defaultValue="" defaultChecked></option>
                                {produtos && produtos.map(item=> {
                                    return (
                                        <option>{item.categorie}</option>
                                    )
                                })}
                            </select><br/>
                        </div>
                        <div className={styles.select_outro}>
                            <input type="checkbox" onClick={()=> setSelectOutro(!Outro)}/>
                            <p>outro</p>
                        </div>
                        <div>{!Outro ? <input type="text" disabled/>: <input type="text" onChange={(el)=>setCategorie(el.target.value)}/>}</div>
                    </div>
                    <div>
                        <label>descrição do produto</label>
                        <textarea className={styles.textarea} rows="4" cols="30" 
                        onChange={(el) => setDescrição(el.target.value)}></textarea>
                    </div>

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