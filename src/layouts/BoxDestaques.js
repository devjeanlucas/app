import styles from "./BoxDestaques.module.css"
import All from "../PagesCategories/all"

export default function Detaques() {
    return (
        <>
            <div className={styles.container}>
                <div className={`row ${styles.content_title}`}>
                    <div className="col-4">
                        <div className={styles.line}></div>
                    </div>
                    <div className="col-4">
                        <div className={styles.title}>
                            <h2>Destaques</h2>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className={styles.line}></div>
                    </div>
                </div>
                <div>
                    <All destaque="true" swiper="yes"/>
                </div>
            </div>
        </>
    )
}