import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uid?:string
  constructor(private router: Router) { 
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid=user.uid
      } else {
        this.uid= undefined
      }
    });
  }

  isAuthenticated(){
    return this.uid? true : false
  }

  registerUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        alert("Sign Up Successfully :)")
        this.router.navigate(['/saveworkout'])
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        alert("Something went wrong :( ");
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Login Successfull :)")
        this.router.navigate(['/saveworkout'])
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        alert("Something went wrong :( ");
      });
  }
  
  logout() {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      alert("Something Went Wrong :( ")
    });
  }
}
