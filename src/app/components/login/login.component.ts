import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService:AuthService,private router:Router){}
  email = new FormControl("", [
    Validators.required,
    Validators.email
  ])
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ])
  loginForm = new FormGroup({
    email: this.email,
    password: this.password
  })
  login() {
    console.log(this.loginForm.value)
    const email = this.loginForm.value.email as string
    const password= this.loginForm.value.password as string
    this.authService.loginUser(email,password)
  }
  goToSignup(){
    this.router.navigate(['/signup'])
  }
  reset(){
     this.loginForm.reset()
  }
}
