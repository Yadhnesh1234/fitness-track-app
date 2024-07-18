import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { DataTablesModule } from 'angular-datatables'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [DataTablesModule,CommonModule],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})
export class UserslistComponent implements OnInit {
  usersList: any = undefined
  dtoptions: any = []
  dttrigger: any = new Subject<any>()
  constructor(private dbSevice: DbService, private router: Router) {
  }
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: "full_numbers",
      lengthMenu: [5, 10, 15, 25],
      pageLength: 10,
      language: {
        searchPlaceholder: "Enter The User Name or By Workout Type"
      },
      initComplete: function() {
        const api = this.api();

        $('<input type="text" placeholder="Search by Username" class="form-control mb-2" />')
          .appendTo($('.dataTables_filter'))
          .on('keyup change clear', function (this: HTMLInputElement) {
            if (api.search() !== this.value) {
              api.search(this.value).draw();
            }
          });

        $('<input type="text" placeholder="Search by Workout Type" class="form-control mb-2" />')
          .appendTo($('.dataTables_filter'))
          .on('keyup change clear', function (this: HTMLInputElement) {
            if (api.column(1).search() !== this.value) {
              api.column(1).search(this.value).draw();
            }
          });
      }
    }
    this.dbSevice.getAllUser().then((data: any) => {
      console.log(data)
      this.usersList = data
      console.log(this.usersList[0].id)
      this.dttrigger.next();
    })

  }
  goToProfile(userId: string): void {
    this.router.navigate(['/profile', userId]);
  }
  ngOnDestroy(): void {
    this.dttrigger.unsubscribe();
  }
}
