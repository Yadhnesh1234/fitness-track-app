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
      this.dtoptions={
        pagingType:"full_numbers",
        lengthMenu:[5,10,15,25],
        pageLength:10,
        language:{
          searchPlaceholder:"Enter The User Name"
        }
      }
      this.dbSevice.getAllUser().then((data:any)=>{
        console.log(data)
        this.usersList=data
        console.log(this.usersList[0].id)
        this.dttrigger.next();
      })
     }
     ngOnDestroy(): void {
      this.dttrigger.unsubscribe();
    }
}
