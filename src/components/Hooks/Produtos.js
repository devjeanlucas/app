import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import App from "./App";




const produtos = []
const db = getFirestore(App)
const UserCollection = collection(db, "produtos")


const getUsers = async () => {
const data = await getDocs(UserCollection);
produtos.push((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
    };
getUsers()
    


export default produtos