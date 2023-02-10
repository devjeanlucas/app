import loading from "../img/loading.svg"
import styles from "./loading.module.css"

function Loading () {
    return (
        <div className={styles.spinner_container}>
            <div className={styles.loading_spinner}></div>
        </div>
    )
}
export default Loading