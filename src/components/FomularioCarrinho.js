import styles from "./FormularioCarrinho.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import '@firebase/firestore';
import Box_confirm from "./Box_Confirm";





export default function ConfirmaCarrinho () {
    
    const [state, setState] = useState(false)
    

    return (
        <>
        <div className="container">
            <h3>Você confirma os itens que estão na sacola?</h3>
            <div>
                
                {state ? <button id="confirm" onClick={() => setState(!state)}className={styles.btn_confirmado}>confirmado</button> : <button className={styles.btn_confirm} id="confirm" onClick={() => setState(!state)}>confirmar</button>}
                
            </div>
        </div>
        <div className={styles.navigation}>
            <Link to="/checkout/usuario"><button className={styles.btn_cancel}>cancelar</button></Link>

            {state && <button className={styles.btn_confirm} type="button" data-bs-toggle="modal" data-bs-target={`#BoxtoPay`}> Avançar</button>}
        </div>
        <div className="modal fade" id="BoxtoPay" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog modal-md`}>
                <div className="modal-content">
                    <Box_confirm
                        type="button"
                        dismiss="modal"
                        aria_label="Close"
                        id=""
                        title="Continuar para Pagamento?"
                        no="continuar"
                        yes="cancelar"
                        ação = "Ir para pagamento"
                    />
                </div>
            </div>
        </div>
        </>
    )
}