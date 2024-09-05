import { firebaseConfig } from "@/constant";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth};