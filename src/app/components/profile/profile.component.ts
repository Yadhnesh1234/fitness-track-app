import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string | null = null;
  userData: any = {
    id: null,
    name: null,
    workouttype: null,
    duration: null
  };

  constructor(private route: ActivatedRoute, private dbService: DbService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId) {
        this.loadUserData(this.userId);
      }
    });
  }

  async loadUserData(docId: string): Promise<void> {
    this.userData = await this.dbService.getOneUser(docId);
    console.log(this.userData)
  }
}
