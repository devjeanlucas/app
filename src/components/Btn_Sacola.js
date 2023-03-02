import styles from "../pages/Carrinho.module.css"
import TelaCheckOut from "../components/TelaPagamento"
import { useState } from "react"

export default function Btn_Sacola (props) {
    const [seed, setSeed] = useState(1);
    const reset = () => {
        setSeed(Math.random());
    }
    return (
        <div>
            <button className={`${styles.view_mobile} ${props.className}`} type="button" data-bs-toggle="modal" data-bs-target="#checkOutModal" onClick={reset}><p>Minha Sacola</p></button>
                  <div className="modal fade" id="checkOutModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className={`modal-dialog modal-sm`}>
                        <div className="modal-content">
                            <TelaCheckOut 
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            key={seed}/>
                        </div>
                    </div>
                </div>
        </div>
    )
}