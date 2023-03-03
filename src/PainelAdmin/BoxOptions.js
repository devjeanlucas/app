import BoxVendas from "./BoxVendas"
import BoxFavoritos from "./BoxFavoritos"
import styles from "./BoxOptions.module.css"
import BoxAcompanhaEstoque from "./BoxAcompanharEstoque"

export default function BoxOptions () {
    return (
        <>
        <div className={`row ${styles.row}`}>
            <div className="col-12">
                <BoxAcompanhaEstoque/>
            </div>

            <div className="col-6">
                <BoxVendas/>
            </div>
            <div className="col-6">
                <BoxFavoritos/>
            </div>
        </div>
        </>
    )
}