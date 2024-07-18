import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs,getDoc,doc , query, where, Timestamp } from "firebase/firestore";
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
      const currentDate = new Date();
      const docRef = await addDoc(collection(this.db, "users"), {...user,createdAt: currentDate });
      alert("New User Added")
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getAllUser() {
    let result: any = []
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);  

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);  

      const q = query(collection(this.db, "users"),
                      where('createdAt', '>=', Timestamp.fromDate(today)),
                      where('createdAt', '<', Timestamp.fromDate(tomorrow)));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        
        const userData = doc.data();
        const createdAt = userData['createdAt'].toDate(); 

        const formattedDate = `${String(createdAt.getDate()).padStart(2, '0')}/${String(createdAt.getMonth() + 1).padStart(2, '0')}/${String(createdAt.getFullYear()).slice(-2)}`;

        result.push({ id: doc.id, ...userData, createdAt: formattedDate});
      })
      return result;
    } catch (e) {
      console.error("Error retrieving documents: ", e);
    }
  }
  async getOneUser(docId: string) {
    const docRef = doc(this.db, "users", docId);
    const docUser = await getDoc(docRef);

    if (!docUser.exists()) {
      return {
        id: null,
        name: null,
        workouttype: null,
        duration: null,
        progress: {
          cardio: 0,
          strength: 0,
          flexibility: 0,
          total: 0
        }
      };
    }

    const userData = docUser.data();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const q = query(collection(this.db, "users"),
      where('username', '==', userData['username']));
    
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)

    let cardioDuration = 0;
    let strengthDuration = 0;
    let flexibilityDuration = 0;
    let totalDuration = 0;

    querySnapshot.forEach((doc) => {
      const workoutData = doc.data();
      totalDuration += workoutData['duration'];
      console.log(workoutData['duration'])
      switch (workoutData['workouttype']) {
        case 'cardio':
          cardioDuration += workoutData['duration'];
          break;
        case 'strength':
          strengthDuration += workoutData['duration'];
          break;
        case 'flexibility':
          flexibilityDuration += workoutData['duration'];
          break;
        default:
          break;
      }
    });

    const progress = {
      cardio: (cardioDuration / 20 * 100).toFixed() || 0,
      strength: (strengthDuration / 30 * 100).toFixed() || 0,
      flexibility: (flexibilityDuration / 40 * 100).toFixed() || 0,
      total: totalDuration/90*100 || 0
    };
    console.log(progress)
    return {
      ...userData,
      progress
    };
  }
}
