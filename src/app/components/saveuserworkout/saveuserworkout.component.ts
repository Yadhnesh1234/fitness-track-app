import { Component , OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { DropSetting, User } from '../../../models/users';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-saveuserworkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgMultiSelectDropDownModule
  ],
  templateUrl: './saveuserworkout.component.html',
  styleUrls: ['./saveuserworkout.component.css']
})
export class SaveuserworkoutComponent implements OnInit{

  constructor(private dbSevice:DbService) {}

  dropdownList:{item_id:number,item_text:string}[] = [];
  selectedItems:{item_id:number,item_text:string}[] = [];
  dropdownSettings:DropSetting = {
    singleSelection: false,
    idField: "",
    textField: "",
    selectAllText: "",
    unSelectAllText: "",
    itemsShowLimit: 0,
    allowSearchFilter: false
  };

  username = new FormControl("", [
    Validators.required,
    Validators.minLength(8)
  ]);
  workouttype = new FormControl("", [
    Validators.required
  ]);
  duration = new FormControl(0, [
    Validators.required,
    Validators.min(1)
  ]);
  workoutForm = new FormGroup({
    username: this.username,
    workouttype: this.workouttype,
    duration:this.duration
  });

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Cardio' },
      { item_id: 2, item_text: 'Strength' },
      { item_id: 3, item_text: 'Flexibility' }
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  async save() {
    if (this.workoutForm.valid) {
      await this.dbSevice.createUser(this.workoutForm.value as User)
      this.reset();
    } else {
      console.error('Form is invalid');
    }
  }

  reset(){
     this.workoutForm.reset();
     this.selectedItems = [];
  }
}
