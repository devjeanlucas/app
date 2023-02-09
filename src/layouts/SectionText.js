import styles from "./SectionText.module.css"
import {FaQuoteLeft} from "react-icons/fa"

export default function Text() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.text}>
                    <h1><FaQuoteLeft/></h1>
                    <h2>Lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem</h2>
                    <h3>Descubra-se</h3>
                </div>
            </div>
        </div>
    )
}