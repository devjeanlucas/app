import BoxVendas from "./BoxVendas"
import BoxFavoritos from "./BoxFavoritos"
import styles from "./BoxOptions.module.css"

export default function BoxOptions () {
    return (
        <>
        <div className={`row ${styles.row}`}>
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