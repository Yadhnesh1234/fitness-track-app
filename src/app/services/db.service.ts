import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs,getDoc,doc } from "firebase/firestore";
import { User } from '../../models/users';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db?: any
  constructor() {
    this.db = getFirestore()
  }

  async createUser(user: User) {
    try {
      const docRef = await addDoc(collection(this.db, "users"), user);
      alert("New User Added")
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getAllUser() {
    let result: any = []
    try {
      const querySnapshot = await getDocs(collection(this.db, "users"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        result.push({ id: doc.id, ...doc.data(),progress:1 })
      })
      return result
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getOneUser(docId:string) {
    const docRef = doc(this.db, "users", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return {
        id:null,
        name:null,
        workouttype:null,
        duration:null
      }
    }
  }
}
