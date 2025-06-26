import { defineStore } from "pinia";
import {auth ,db} from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,} from 'firebase/auth';
import {doc,setDoc ,getDoc} from 'firebase/firestore';

export const useAuthStore = defineStore('auth',{

    state:() =>({
        user:null,
        role:null,
        username:null
    }),

    actions :{

    async register (email ,password ,role){

        const userCred = await createUserWithEmailAndPassword(auth,email,password);
        const uid = userCred.user.uid


        await setDoc(doc(db,'users',uid),{
            email,username,role
        });

        this.user = userCred.user;
        this.username =this.username;
        this.role = role;
    },

    async login(email,password){

        const useCred = await signInWithEmailAndPassword(auth,email,password);
        const uid = useCred.user.uid;

         const userDoc = await getDoc(doc(db,'users',uid));
        this.user = userCred.user;
        this.role = userDoc.data().role;
    },

    async logout(){
        await signOut(auth);
        this.user = null;
        this.role = null;
    }

    }
})