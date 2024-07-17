import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authService:AuthService,private router:Router){}
  email = new FormControl("", [
    Validators.required,
    Validators.email
  ])
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ])
  signupForm = new FormGroup({
    email: this.email,
    password: this.password
  })
  signup() {
    console.log(this.signupForm.value)
    const email = this.signupForm.value.email as string
    const password= this.signupForm.value.password as string
    this.authService.registerUser(email,password)
  }
  reset(){
     this.signupForm.reset()
  }
}
