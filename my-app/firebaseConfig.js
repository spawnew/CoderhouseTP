
import{initializateApp, getApps,getApp} from "firebase/app"
import{getAuth} from "firebase/Auth"
import{Firestore} from "firebase/firestore"
import { useSyncExternalStore } from "react";



const firebaseConfig={
 apiKey: "AIzaSyDkb59whr15PKsevljt5RnpFCeb70f24os",
  authDomain: "buscamichi.firebaseapp.com",
  projectId: "buscamichi",
  storageBucket: "buscamichi.firebasestorage.app",
  messagingSenderId: "695585794458",
  appId: "1:695585794458:web:6e3378652ff8af18437223"
}



const app = getApps().length===0 ? initializateApp(firebaseConfig) : getApp()

//exporto las instacias del servicio

export const auth= getAuth(app)   //modulo de autenticacion
export const db= getFirestore(app) //base de datos de firestore