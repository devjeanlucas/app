import { FaRegHeart, FaRegSave, FaTimes } from "react-icons/fa"
import styles from "./Add.module.css"
import '@firebase/firestore';
import {  getFirestore, doc,  collection, getDocs, setDoc, deleteDoc} from "@firebase/firestore";
import { useEffect, useState } from "react";
import App from "../components/Hooks/App";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SwiperSlide,Swiper } from "swiper/react";

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
    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()
    const [img4, setImg4] = useState()
    const [descrição, setDescrição] = useState()
    const [categorie, setCategorie]= useState()
    const [marca, setMarca] = useState()
    const [material, setMaterial] = useState()
    const [Outro, setSelectOutro] = useState(false)
    const [driveimg, setDriveImg] = useState(true)

    const [driveimg1, setDriveImg1] = useState(true)
     const [driveimg2, setDriveImg2] = useState(true)
     const [driveimg3, setDriveImg3] = useState(true)


    async function addItem () {

        if (!imagem || !nome || !preco || !marca || !material || !estoque || !descrição) {
            return toast.error("Todos os campo devem ser preenchidos")
        }
        

        await setDoc(doc(db, 'produtos', `${id}`), {
            imagem: driveimg ? `https://docs.google.com/uc?id=${imagem}`: imagem,
            img1: driveimg1 ? `https://docs.google.com/uc?id=${img1}`: img1,
            img2: driveimg2 ? `https://docs.google.com/uc?id=${img2}`: img2,
            img3: driveimg3 ? `https://docs.google.com/uc?id=${img3}`: img3,
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

    function formataTextoGoogleDrive (texto) {
        texto = texto.split('/')
        return texto[5]
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
                    <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    >
                        <SwiperSlide>
                            {imagem &&
                            driveimg ? 
                            <img src={`https://docs.google.com/uc?id=${imagem}`}/>:
                            <img src={`${imagem}`}/>}
                        </SwiperSlide>
                        {img1 && 
                            <SwiperSlide>
                                {img1 &&
                                driveimg1 ?
                                <img src={`https://docs.google.com/uc?id=${img1}`}/>:
                                <img src={`${img1}`}/>
                            }
                            </SwiperSlide>
                        }
                        {img2 &&
                        <SwiperSlide>
                            {img2 &&
                            driveimg2 ?
                            <img src={`https://docs.google.com/uc?id=${img2}`}/>:
                            <img src={`${img2}`}/>
                            }
                        </SwiperSlide>
                        }
                        

                        {img3 &&
                            <SwiperSlide>
                                {driveimg3 ?
                                <img src={`https://docs.google.com/uc?id=${img3}`}/>:
                                <img src={`${img3}`}/>
                                }
                            </SwiperSlide>
                        }
                        
                        
                    </Swiper>
                        
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
                    <div>
                        <div className={styles.flex}>
                            <label>Imagem</label>
                            <div className={styles.check_box}>
                                <input type="checkbox" onClick={() => setDriveImg(!driveimg)} defaultChecked/>
                                <label>drive</label>
                            </div>
                        </div>
                            
                            {driveimg ?
                            <input type="text" onChange={(el)=> {setImagem(formataTextoGoogleDrive(el.target.value))}}/>: 
                            <input type="text" onChange={(el)=> {setImagem(el.target.value)}}/>}

                            {imagem &&
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                <button className={`${styles.more_imgs} accordion-button collapsed`} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Adicionar mais 
                                </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div >
                                        <ul id="imagens" className={styles.imagens}>
                                            <li>
                                                <div className={styles.flex}>
                                                    <label>Nova Imagem1</label>
                                                    <div className={styles.check_box}>
                                                        <input type="checkbox" onClick={() => setDriveImg1(!driveimg1)} defaultChecked/>
                                                        <label>drive</label>
                                                    </div>
                                                </div>
                                                {driveimg1 ?
                                                    <input type="text" onChange={(el)=> {setImg1(formataTextoGoogleDrive(el.target.value))}}/>: 
                                                    <input type="text" onChange={(el)=> {setImg1(el.target.value)}}/>}
                                            </li>
                                            <li>
                                                <div className={styles.flex}>
                                                    <label>Nova Imagem2</label>
                                                    <div className={styles.check_box}>
                                                        <input type="checkbox" onClick={() => setDriveImg2(!driveimg2)} defaultChecked/>
                                                        <label>drive</label>
                                                    </div>
                                                </div>
                                                {driveimg2 ?
                                                <input type="text" onChange={(el)=> {setImg2(formataTextoGoogleDrive(el.target.value))}}/>: 
                                                <input type="text" onChange={(el)=> {setImg2(el.target.value)}}/>}
                                            </li>
                                            <li>
                                                <div className={styles.flex}>
                                                    <div className={styles.flex}>
                                                        <label>Nova Imagem3</label>
                                                        <div className={styles.check_box}>
                                                            <input type="checkbox" onClick={() => setDriveImg3(!driveimg3)} defaultChecked/>
                                                            <label>drive</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                    {driveimg3 ?
                                                    <input type="text" onChange={(el)=> {setImg3(formataTextoGoogleDrive(el.target.value))}}/>: 
                                                    <input type="text" onChange={(el)=> {setImg3(el.target.value)}}/>}
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                            </div>
                            }
                    </div>
                    
                   
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