import styles from "./ToggleListCategories.module.css"
import MenuCategories from "../layouts/MenuCategories"
import MenuMobile from "../components/MenuCategoriesMobile"
import {FaAngleRight} from "react-icons/fa"

export default function List () {
    return (
        <>
            
            <div className={styles.container_list_categories}>
                <MenuCategories/>
                <button className={`navbar-toggler ${styles.btn_Categories}`}type="button" data-bs-toggle="modal" data-bs-target="#toggleCategories">
                    <p>categorias</p><FaAngleRight/>
                </button>

            </div>
           
            
            
            <div className="modal fade" id="toggleCategories" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <MenuMobile
                        type="button" 
                        dismiss="modal"
                        aria_label="Close"/>
                    </div>
                </div>
            </div>

        </>
    )
}