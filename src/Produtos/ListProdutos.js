import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };
const app = firebase.initializeApp(firebaseConfig)


function App () {
    const [users, setUsers] = useState([])
    const db = getFirestore(app)
    const UserCollection = collection(db, "produtos")
  
    useEffect (()=>{
      const getUsers = async () => {
        const data = await getDocs(UserCollection);
        setUsers((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
      };
      getUsers()
    },[])
}

