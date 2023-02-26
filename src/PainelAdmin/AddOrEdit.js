import AddITem from "./AddItem";
import EditeItem from "./EditeItem";

export default function AddOrEdit (props) {

    return (
        <>
        {props.ação == "adicionar" && 
        <AddITem 
        type="button"
        dismiss="modal"
        aria_label="Close"/>
        }


        {props.ação == "editar" && 
        <EditeItem produto={props.produto} 
        type="button"
        dismiss="modal"
        aria_label="Close"/>
        }
    
        </>
    )
}