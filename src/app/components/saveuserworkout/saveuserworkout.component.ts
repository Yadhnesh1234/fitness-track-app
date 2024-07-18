import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { User } from '../../../models/users';

@Component({
  selector: 'app-saveuserworkout',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './saveuserworkout.component.html',
  styleUrl: './saveuserworkout.component.css'
})
export class SaveuserworkoutComponent {

  constructor(private dbSevice:DbService) {}

  username = new FormControl("", [
    Validators.required,
    Validators.minLength(8)
  ])
  workouttype = new FormControl("", [
    Validators.required
  ])
  duration = new FormControl(0, [
    Validators.required,
    Validators.min(1)
  ])
  workoutForm = new FormGroup({
    username: this.username,
    workouttype: this.workouttype,
    duration:this.duration
  })
  async save() {
    if (this.workoutForm.valid) {
      await this.dbSevice.createUser(this.workoutForm.value as User)
      this.reset();
    } else {
      console.error('Form is invalid');
    }
  }
  reset(){
     this.workoutForm.reset()
  }
}
