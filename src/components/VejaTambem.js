import styles from "./VejaTambem.module.css"
import All from "../PagesCategories/all"

export default function VejaTambem (props) {

    return (
        <>
            <div className="row">
                <div className="col-4">
                    <div className={styles.line}></div>
                </div>
                <div className="col-4">
                    <div className={styles.title}>
                        <h4>Veja também</h4>
                    </div>
                </div>
                <div className="col-4">
                    <div className={styles.line}></div>
                </div>
            </div>
            <All swiper={props.swiper} categorie={props.categorie}/>
        </>
    )
}