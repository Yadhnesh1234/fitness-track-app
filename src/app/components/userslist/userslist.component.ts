import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import {DataTablesModule} from 'angular-datatables'
import { Subject } from 'rxjs';
@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})
export class UserslistComponent implements OnInit {
     usersList:any=[]
     dtoptions:any=[]
     dttrigger:any=new Subject<any>()
     constructor(private dbSevice:DbService){
     }
     ngOnInit(): void {
      this.loadUsers()
      this.dtoptions={
        pagingType:"full"
      }
     }
     loadUsers(){
        for(let i=1;i<100;i++){
          this.usersList.push({
            id:1,
            username:"Raj",
            workouttype:"cardio",
            duration:2,
            progress:"20%"
          })
        }
     }
}
