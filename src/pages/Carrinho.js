import styles from "./Carrinho.module.css"
import {FaTrashAlt, FaPlus, FaMinus} from "react-icons/fa"
import { Link } from "react-router-dom"
import CarrinhoVazio from "../components/CarrinhoVazio"
import TelaCheckOut from "../components/TelaPagamento"
import TelaCheckOutMobile from "../components/TelaPagamentoMobile"
import Frete from"../components/Frete"
import { useState } from "react"
import { FaAngleLeft } from "react-icons/fa"

export default function Carrinho() {

    function pegaDados() {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }

        return produtosSalvos
    }
    function remove(id) {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        let index = produtosSalvos.findIndex(i => i.id == id)
        produtosSalvos.splice(index, 1) 
        salva(produtosSalvos)
        window.location.reload()
    }
    function salva(list) {
        localStorage.setItem("itenscarrinho", JSON.stringify(list))
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
        salva(produtosSalvos)
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
        salva(produtosSalvos)
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
    const showOrHide = () => setShowElement(!showElement)

    const item = pegaDados()


    

    return (
        <div className="row">
            
            <Link to="/estoque/todos" className={styles.btn_return}><FaAngleLeft/><p>retornar ao estoque</p></Link>
            <div className="col-sm-12 col-md-6 col-lg-7 order-1 order-sm-1 order-md-1">
                <h2 className={styles.title_sacola}>Sacola</h2>
                <div className={styles.container}>
                    <Frete/>
                    <ul className={`row ${styles.container_list}`}>
                        {item.length > 0 ? item.map(prod => {
                            return (
                                <li className="col-sm-12" key={prod.id}>
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
                                                        onClick={(el) => {
                                                            const svg = el.target.parentElement
                                                            const a = svg.parentElement
                                                            const b = a.parentElement
                                                            const id = b.getAttribute("id")
                                                            remove(id, prod.nome)
                                                        }}/>
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
                        }):<CarrinhoVazio/>}
                    </ul>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 order-2 col-lg-5">
                <div className={styles.box_buy}>
                    <TelaCheckOut className={styles.chekoutdesk}/>
                
                </div>
            </div>

            

        </div>

    
    )
}