import User from "../components/Hooks/User"
import {useState } from "react";
import styles from "../PagesCategories/all.module.css"
import { FaPlusCircle } from "react-icons/fa";
import AddITem from "./AddItem";

export default function BtnAddItem () {


    const[ação,setAção] = useState()


    return (
        <>
        {User && User[0] && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" &&
            <div>
                <button
                className={styles.button_add}
                type="button" 
                data-bs-toggle="modal" 
                data-bs-target="#ModalAdd"
                onClick={()=> {
                    setAção("adicionar")
                    }}
                >
                    <FaPlusCircle className={styles.icon_more}/>
                    adicionar novo
                </button>
            </div>
            }

        <div className="modal fade" id="ModalAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog modal-md`}>
                <div className="modal-content">
                    <AddITem 
                    type="button"
                    dismiss="modal"
                    aria_label="Close"
                    ação={ação}
                    />
                </div>
            </div>
        </div>



        </>

    )
}