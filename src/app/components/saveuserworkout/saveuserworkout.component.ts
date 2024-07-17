import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-saveuserworkout',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './saveuserworkout.component.html',
  styleUrl: './saveuserworkout.component.css'
})
export class SaveuserworkoutComponent {
  username = new FormControl("", [
    Validators.required,
    Validators.minLength(8)
  ])
  workouttype = new FormControl("", [
    Validators.required
  ])
  duration = new FormControl("", [
    Validators.required,
    Validators.min(1)
  ])
  workoutForm = new FormGroup({
    username: this.username,
    workouttype: this.workouttype,
    duration:this.duration
  })
  save() {
    if (this.workoutForm.valid) {
      console.log(this.workoutForm.value);
      this.reset();
    } else {
      console.error('Form is invalid');
    }
  }
  reset(){
     this.workoutForm.reset()
  }
}
