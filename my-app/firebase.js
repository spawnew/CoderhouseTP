import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig={
 apiKey: "AIzaSyDkb59whr15PKsevljt5RnpFCeb70f24os",
  authDomain: "buscamichi.firebaseapp.com",
  projectId: "buscamichi",
  storageBucket: "buscamichi.firebasestorage.app",
  messagingSenderId: "695585794458",
  appId: "1:695585794458:web:6e3378652ff8af18437223"
}




const app = initializeApp(firebaseConfig)
export const auth=getAuth(app)