import styles from "./Carrinho.module.css"
import {FaTrashAlt, FaPlus, FaMinus} from "react-icons/fa"
import { Link } from "react-router-dom"
import CarrinhoVazio from "../components/CarrinhoVazio"
import TelaCheckOut from "../components/TelaPagamento"
import Frete from"../components/Frete"
import { useState } from "react"
import { FaAngleLeft } from "react-icons/fa"
import Box_confirm from "../components/Box_Confirm"

export default function Carrinho() {

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

    const [showElement, setShowElement] = useState(false)

    const item = pegaDados()

    const enviaId = (el) => {
        const a = el.parentElement
        const b = a.parentElement
        const c = b.parentElement
        const id = c.getAttribute("id")
        const vazio = []

        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("idExcluido")) {
            produtosSalvos = JSON.parse(localStorage.getItem("idExcluido"))
        }

        const tru = typeof(id) == "string"

        if (produtosSalvos.length >= 1 || !tru) {
            produtosSalvos.pop()
        }
       
        produtosSalvos.push(id)

        salva("idExcluido", produtosSalvos)
        
        
    }
    
    
    
    return (
        <>
        <div className="row">
            
            <Link to="/estoque/todos" className={styles.btn_return}><FaAngleLeft/><p>retornar ao estoque</p></Link>
            <div className="col-sm-12 col-md-6 col-lg-7 order-1 order-sm-1 order-md-1">
                <h2 className={styles.title_sacola}>Sacola</h2>
                <div className={styles.container}>
                    <Frete/>
                    <ul className={`row ${styles.container_list}`}>
                        {item.length > 0 ? item.map(prod => {
                            return (
                                <li className="col-sm-12" key={prod.id} id={prod.id}>
                                    <div className={styles.box}>
                                        <div className={`row ${styles.content_box}`}>
                                            <div className="col-sm-7 col-md-5 col-lg-6">
                                                <Link to={`/produtos/${prod.id}`}><img src={prod.imagem} className={styles.img_box}/></Link>
                                            </div>
                                            <div className="col-sm-4 col-md-7 col-lg-6">
                                                <div className={styles.cont_left} id={prod.id}>
                                                    <div className={styles.header_left}>
                                                        <h4>{prod.nome}</h4>


                                                        <FaTrashAlt className={styles.btn_remove}
                                                        onClick={ el => {enviaId(el.target)}}
                                                        type="button" data-bs-toggle="modal" data-bs-target={`#ModalConfirm`}
                                                        />






                                                    </div>
                                                    <p>R$ {prod.preco},00</p>
                                                    <div className={styles.qtd} id={prod.id}>
                                                        <p>qtd.</p>
                                                        <input type="number"  defaultValue={pegaQTD(prod.id)}/>
                                                        <FaPlus className={styles.btn_control} onClick={(el)=> {
                                                            const a = el.target
                                                            somar(a, prod.id)
                                                        }}/>
                                                        <FaMinus className={styles.btn_control}
                                                        onClick={(el)=> {
                                                            const a = el.target
                                                            diminuir(a, prod.id)
                                                        }}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                        
                        ):<CarrinhoVazio/>}
                    </ul>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 order-2 col-lg-5">
                <div className={styles.box_buy}>
                    <TelaCheckOut className={styles.chekoutdesk}/>
                </div>
            </div>
            </div>

            <div className="modal fade" id="ModalConfirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
            data-bs-backdrop="static" data-bs-keyboard="false">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <Box_confirm
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                        />
                    </div>
                </div>
            </div>
        </>

    
    )
}