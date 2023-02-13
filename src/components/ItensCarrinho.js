import styles from "../pages/Carrinho.module.css"
import {FaTrashAlt, FaPlus, FaMinus} from "react-icons/fa"
import { Link } from "react-router-dom"
import CarrinhoVazio from "../components/CarrinhoVazio"
import { useState } from "react"
import Box_confirm from "../components/Box_Confirm"
import TotalBox from "../components/totalBox"




export default function ItensCarrinho () {

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

    function limpacarrinho () {
        setValue({})
    }

    const item = pegaDados()

    
    const [value, setValue] = useState({})

    return (
        <>
        
        <div className={styles.container}>
                    <TotalBox/>
                    <ul className={`row ${styles.container_list}`}>
                        {item.length > 0 ? item.map(prod => {
                            return (
                                <li className="col-sm-12" key={prod.id} id={prod.id}>
                                    <div className={styles.box}>
                                        <div className={`row ${styles.content_box}`}>
                                            <div className="col-4 col-sm-7 col-md-5 col-lg-6">
                                                <Link to={`/produtos/${prod.id}`}><img src={prod.imagem} className={styles.img_box}/></Link>
                                            </div>
                                            <div className="col-8 col-sm-5 col-md-7 col-lg-6">
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

                <div className="modal fade" id="ModalConfirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
                data-bs-backdrop="static" data-bs-keyboard="false">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <Box_confirm
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            id={value}
                        />
                    </div>
                </div>
            </div>
        </>
                
    )
}