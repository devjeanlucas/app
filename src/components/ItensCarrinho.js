import styles from "./ItensCarrinho.module.css"
import {FaTrashAlt, FaPlus, FaMinus} from "react-icons/fa"
import { Link } from "react-router-dom"
import CarrinhoVazio from "../components/CarrinhoVazio"
import Box_confirm from "../components/Box_Confirm"
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import App from "../components/Hooks/App";
import { toast, ToastContainer } from "react-toastify"




export default function ItensCarrinho () {

    const [produtos, setProdutos] = useState([])
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


    function pegaDados() {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }

        return produtosSalvos
    }
    function salva(namelist, list) {
        localStorage.setItem(namelist, JSON.stringify(list))
    }
    function somar(target, id) {
        var count = 1
        const a = target
        const b = a.parentElement
        const c = b.parentElement
        const d = c.querySelector("input")
        count += parseInt(d.value)
        d.value = count

        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        let index = produtosSalvos.findIndex(prop => prop.id == id)
        const obj = produtosSalvos[index]
        obj['qtd'] = count
        salva("itenscarrinho", produtosSalvos)
        window.location.reload()
    }
    function diminuir (target, id) {
        var count = 1
        const a = target
        const b = a.parentElement
        const c = b.parentElement
        const d = c.querySelector("input")
        if (parseInt(d.value) == 1) {
            return
        }
        var result = parseInt(d.value) - count
        d.value = result

        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }

        let index = produtosSalvos.findIndex(prop => prop.id == id)
        const obj = produtosSalvos[index]
        
        obj['qtd'] = result
        salva("itenscarrinho", produtosSalvos)
        window.location.reload()
    }
    function pegaQTD (id) {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        let index = produtosSalvos.findIndex(prop => prop.id == id)
        const obj = produtosSalvos[index]
        return obj['qtd']
    }

    function cliqueEnter (qtd, id) {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        let index = produtosSalvos.findIndex(prop => prop.id == id)
        const obj = produtosSalvos[index]
        if (obj['estoque'] < parseInt(qtd)) {
            toast.error('Estoque insuficiente para compra')
        } else {
            obj['qtd'] = parseInt(qtd)
            salva("itenscarrinho", produtosSalvos)
            window.location.reload()
        }
        
    }



    const item = pegaDados()
    const [value, setValue] = useState({})




    return (
        <>
        <div className={styles.container}>
                    <ul className={`row ${styles.container_list}`}>
                        {item.length > 0 ? item.map(prod => {
                            return (
                                <li className={styles.box} key={prod.id} id={prod.id}>
                                    <div>
                                        <div className={`row ${styles.content_box}`}>
                                            <div className="col-3 col-sm-4 col-lg-5">
                                                <div className={styles.contImagem}>
                                                    <Link to={`/produtos/${prod.nome}`}><img src={prod.imagem} className={styles.img_box}/></Link>
                                                </div>
                                            </div>
                                            <div className="col-9 col-sm-8 col-lg-7">
                                                <div className={styles.cont_left} id={prod.id}>
                                                    <div className={styles.header_left}>
                                                        <h4>{prod.nome}</h4>
                                                        <FaTrashAlt className={styles.btn_remove}
                                                        onClick={ () => {
                                                            setValue({
                                                                id: prod.id,
                                                                nome:prod.nome
                                                            })
                                                        }}
                                                        type="button" data-bs-toggle="modal" data-bs-target={`#ModalConfirm`}
                                                        />
                                                    </div>
                                                    <p className={styles.price}>R$ {prod.preco},00</p>
                                                    <div className={styles.qtd} id={prod.id}>
                                                        <p>qtd.</p>
                                                        <input type="number"  defaultValue={pegaQTD(prod.id)} id="qtd" 
                                                        onKeyDown={(e) => {
                                                            if (e.key == 'Enter') 
                                                            {cliqueEnter(e.target.value, prod.id)}
                                                        }}
                                                            />
                                                            {prod.estoque <= pegaQTD(prod.id) ?
                                                            <button className={styles.btn_control} disabled>
                                                                <FaPlus onClick={(el)=> {
                                                                    const a = el.target
                                                                    somar(a, prod.id)
                                                                }}/>
                                                            </button> :
                                                            <button className={styles.btn_control}>
                                                                <FaPlus onClick={(el)=> {
                                                                    const a = el.target
                                                                    somar(a, prod.id)
                                                                }}/>
                                                            </button>}
                                                            
                                                            <button className={styles.btn_control}>
                                                                <FaMinus
                                                                onClick={(el)=> {
                                                                    const a = el.target
                                                                    diminuir(a, prod.id)
                                                                }}/>
                                                            </button>
                                                    </div>
                                                    <div>
                                                        <p>no estoque: <strong>({prod.estoque})</strong></p>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                        
                        ):<CarrinhoVazio text="Ainda não tem nenhum compra"/>}
                    </ul>
                </div>

                <div className="modal fade" id="ModalConfirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
                data-bs-backdrop="static" data-bs-keyboard="false">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <Box_confirm
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            id={value}
                            title="Deseja retirar este Item?"
                            yes="confirmar"
                            no="cancelar"
                            ação="retirar item sacola"
                        />
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
                
    )
}