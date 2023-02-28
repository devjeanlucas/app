import BtnAddItem from "../PainelAdmin/BtnAddItem"
import All from "./all"
import Categorias from "./Categorias"
import styles from "./ContCategorie.module.css"


export default function ContCategorie () {
    
    

    return (
        <>
        <BtnAddItem/>
        <div className={styles.container}>
            <div className="row">
                <div className="col-sm-3">
                    <div>
                        <Categorias/>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2" tabindex="0">
                        <div className={styles.cont_produtos}>
                            <div>
                                <h4>Tapetes</h4>
                                <All categoria="Tapetes"/>
                            </div>
                            <div>
                                <h4>Vasos</h4>
                                <All categoria="Vasos"/>
                            </div>
                            <div>
                                <h4>Cortinas</h4>
                                <All categoria="Cortinas"/>
                            </div>
                        </div>

                    </div>
            
            
                </div>
            </div>
        </div>
        </>
    )
}