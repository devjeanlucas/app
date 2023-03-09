import { FaRegSave, FaTimes } from "react-icons/fa"
import styles from "./Edit.module.css"
import '@firebase/firestore';
import { doc, updateDoc,  deleteDoc, getFirestore, collection, getDocs,setDoc} from "@firebase/firestore";

import { useState, useEffect } from "react";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from "../components/Hooks/App";
import { Link, useParams } from "react-router-dom";
import User from "../components/Hooks/User";


export default function EditeItem () {


    const {id} = useParams()
    const [nome, setNome] = useState()
    const [preco, setPreco] = useState()
    const [estoque, setEstoque] = useState()
    const [imagem, setImagem] = useState()
    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()
    const [img4, setImg4] = useState()
    const [state, setState] = useState(false)
    const [Categorie, setCategorie]= useState()
    const [marca, setMarca] = useState()
    const [material, setMaterial] = useState()
    const [valueDesconto, setValueDesconto] = useState()
    const [confirmDelete, setConfirmDelete] = useState()
    const [descrição, setDescrição] = useState()
    const [desconto, setDesconto] = useState(false)
    const [destaque, setDestaque] = useState(false)
    const [driveimg, setDriveImg] = useState(true)
    const [Outra_categoria, setSelectOutra_categoria] = useState(false)
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

        const prod = []

        produtos && produtos.map(item=> {
            if (item.id == id) {
                prod.push(item)
            }
        })         

        if (desconto) {
            if (!prod[0].precoDesconto) {
                await setDoc(doc(db, 'produtos', id), {
                    precoDesconto:parseInt(valueDesconto) 
                })
            } else {
                await updateDoc(doc(db, "produtos", id), {
                    precoDesconto:parseInt(valueDesconto) 
                })
            }
        }
        if (destaque) {
            await setDoc(doc(db, 'produtos', id), {
                destaque: true 
            })
        }


        await updateDoc(doc(db, "produtos", id), {
            preco: !preco ? prod[0].preco : parseInt(preco) 
        });
        await updateDoc(doc(db, "produtos", id), {
            img1: img1 ? img1: prod[0].img1 || !prod[0].img1 && ""
        });
        await updateDoc(doc(db, "produtos", id), {
            img2: img2 ? img2: prod[0].img2 || !prod[0].img2 && ""
        });
        await updateDoc(doc(db, "produtos", id), {
            img3: img3 ? img3: prod[0].img3 || !prod[0].img3 && ""
        });
        await updateDoc(doc(db, "produtos", id), {
            img4: img4 ? img4: prod[0].img4 || !prod[0].img4 && ""
        });
        await updateDoc(doc(db, "produtos", id), {
            nome: !nome ? prod[0].nome : nome.trim()
        });
        await updateDoc(doc(db, "produtos", id), {
            descrição: !descrição ? prod[0].descrição : descrição.trim() || !prod[0].descrição && ""
        });
        await updateDoc(doc(db, "produtos", id), {
            estoque:!estoque ? prod[0].estoque : parseInt(estoque) 
        });
        await updateDoc(doc(db, "produtos", id), {
            imagem:!imagem ? prod[0].imagem : driveimg ? `https://docs.google.com/uc?id=${imagem}`: imagem,
        });
        await updateDoc(doc(db, "produtos", id), {
            marca:!marca ? prod[0].marca : marca.trim()
        });
        await updateDoc(doc(db, "produtos", id), {
            material:!material ? prod[0].material : material.trim()
        });
        await updateDoc(doc(db, "produtos", id), {
            categorie:!Categorie ? prod[0].categorie : Categorie.trim()
        });
        await updateDoc(doc(db, "produtos", id), {
            iden: parseInt(id)
        });
        toast.success("Item alterado com sucesso!")
    }
    
    function deletar () {
        const prod = []

        produtos && produtos.map(item=> {
            if (item.id == id) {
                prod.push(item)
            }
        })   

       if (confirmDelete == prod[0].nome) {
        const Doc = doc(db, 'produtos', `${prod[0].id}`);
        deleteDoc(Doc)
        toast.success("Item deletado com sucesso")
    } else {
        toast.error("O nome inserido não confere com o produto")
    }

        
    }

    function formataTextoGoogleDrive (texto) {
        texto = texto.split('/')
        return texto[5]
    }


    return (
        <>
        {produtos.length > 0  && User && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13"  && produtos.map(item => {
            if (id-1 == item.id-1)
            return (
                <>
                <div className={styles.container} key={item.id}>
                    <form>
                        <div className={styles.cont_img}>
                            {driveimg ? 
                            <img src={`https://docs.google.com/uc?id=${imagem}`}/>:
                            <img src={`${!imagem ? item.imagem: imagem}`}/>}
                        </div>




                        <div className={styles.body}>
                            <div>
                                <label>Nome</label>
                                <input type="text" placeholder={item.nome} onChange={(el)=>{setNome(el.target.value)}}/>
                            </div>

                            <div className={`row ${styles.box_price}`}>
                                <div className={`${styles.padding_right} col-6`}>
                                    <label>Preço</label>
                                    <input type="number" placeholder={"R$" + item.preco} onChange={(el)=>{setPreco(el.target.value)}}/>
                                </div>

                                <div className={`${styles.no_margin_no_padding} col-6`}>
                                    <div className={styles.box_desconto}>
                                        <div className={styles.check_box_desconto}>
                                            <input type="checkbox" onClick={()=> setDesconto(!desconto)} 
                                            placeholder={item.precoDesconto ? "R$ "+item.precoDesconto : "0,00"}
                                            />
                                            <label>Aplicar desconto?</label>
                                        </div>
                                        <div>
                                            {!desconto ? <input type="number" disabled/> : 
                                            <input type="number"
                                            onChange={(el)=> setValueDesconto(el.target.value)}
                                            placeholder={item.precoDesconto ? "R$ "+item.precoDesconto : "0,00"}
                                            />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>

                                <label>Imagem</label>

                                <div className={styles.check_box}>
                                    <input type="checkbox" onClick={() => setDriveImg(!driveimg)} defaultChecked/><span>drive</span>
                                </div>

                                {driveimg ?
                                <input type="text" onChange={(el)=> {setImagem(formataTextoGoogleDrive(el.target.value))}}/>: 
                                <input type="text" onChange={(el)=> {setImagem(el.target.value)}}/>}
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="flush-headingOne">
                                        <button className={`${styles.more_imgs} accordion-button collapsed`} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Adicionar mais 
                                        </button>
                                        </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div>
                                   
                                    <ul id="imagens" className={styles.imagens}>
                                        <li>
                                            <label>Imagem 2</label>
                                            <input type="text" onChange={(el)=> setImg1(el.target.value)}   
                                            placeholder={item.img1}
                                            />
                                        </li>
                                        <li>
                                            <label>Imagem 2</label>
                                            <input type="text" onChange={(el)=> setImg2(el.target.value)}
                                            placeholder={item.img2}
                                            />
                                        </li>
                                        <li>
                                            <label>Imagem 3</label>
                                            <input type="text" onChange={(el)=> setImg3(el.target.value)}
                                            placeholder={item.img3}
                                            />
                                        </li>
                                        <li>
                                            <label>Imagem 4</label>
                                            <input type="text" onChange={(el)=> setImg4(el.target.value)}
                                            placeholder={item.img4}
                                            />
                                        </li>
                                    </ul>

                                </div>
                                </div>
                            </div>
                            </div>
                            </div>

                            <label>Categoria</label>
                            <div className={styles.cont_select}>
                                <div className={styles.select}>

                                    <select onChange={(el)=> setCategorie(el.target.value)} className={styles.select}>
                                        {produtos && produtos.map(item=> {
                                            return (
                                                <option>{item.categorie}</option>
                                            )
                                        })}
                                    </select><br/>
                                </div>
                                <div className={styles.select_outro}>
                                    <input type="checkbox" onClick={()=> setSelectOutra_categoria(!Outra_categoria)}/>
                                    <span>outro</span>
                                </div>
                                <div>{!Outra_categoria ? <input type="text" disabled/>: <input type="text" onChange={(el)=>setCategorie(el.target.value)}/>}</div>
                            </div>
                            <div>
                                <label>descrição do produto</label>
                                <textarea className={styles.textarea} rows="4" cols="30" 
                                onChange={(el) => setDescrição(el.target.value)}></textarea>
                            </div>

                            <label>Marca</label>
                            <input type="text" onChange={(el)=>{setMarca(el.target.value)}} placeholder={item.marca}/>

                            <label>Material</label>
                            <input type="text" onChange={(el)=>{setMaterial(el.target.value)}} placeholder={item.material}/>
                            <div className={styles.check_box}>
                                <input type="checkbox" onClick={()=> setDestaque(!destaque)}/>
                                <p>destaque</p>
                            </div>

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