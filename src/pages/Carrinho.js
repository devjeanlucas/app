import styles from "./Carrinho.module.css"
import {Link } from "react-router-dom"
import TelaCheckOut from "../components/TelaPagamento"
import Frete from"../components/Frete"
import { FaAngleLeft } from "react-icons/fa"
import TotalBox from "../components/totalBox"
import ItensCarrinho from "../components/ItensCarrinho"
import Box_confirm from "../components/Box_Confirm"
import { useState } from "react"

export default function Carrinho() {

    
    
    return (
        <>
        <Link to="/estoque/todos" className={styles.btn_return}><div className={styles.cont_return}><FaAngleLeft/><p>retornar ao estoque</p></div></Link>
        <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-7  order-sm-2 order-md-1 order-2">
                <div className={styles.cont_btn_clean}>
                        <button className={styles.btn_clean}
                        type="button" data-bs-toggle="modal" data-bs-target={`#ModalConfirmAll`} >limpar carrinho</button>
                </div>
                <ItensCarrinho/>
            </div>
            <div className="col-12 col-sm-12 col-md-6  order-1 col-lg-5 order-sm-1">
                <div className={styles.box_buy}>
                    <TelaCheckOut className={styles.chekoutdesk}/>
                </div>
            </div>
            </div>

            <div className="modal fade" id="ModalConfirmAll" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
                data-bs-backdrop="static" data-bs-keyboard="false">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <Box_confirm
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            title="Deseja Retirar Tudo?"
                            yes="confirmar"
                            no="cancelar"
                            />
                    </div>
                </div>
            </div>
        </>
    )
}