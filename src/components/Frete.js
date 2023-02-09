import styles from "./Frete.module.css"

export default function frete () {
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <div>
                    <h4>Calcule o frete</h4>
                </div>
                <div className={styles.cont_input}>
                    <input type="text"/>
                    <button><p>Calcular frete</p></button>
                </div>
            </div>
        </div>
    )
}