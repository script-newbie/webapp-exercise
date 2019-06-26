import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from '../users/user.service';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {
  name: string;
  users: User[];

  constructor(private uService: UserService) { }

  ngOnInit() {
    this.users = [];
  }

  onSearch() {
    if (this.name) {
      return this.uService.searchUser(this.name).subscribe((result) => {
        this.users = result;
      });
    }
  }

  onDeleteUser(id, index) {
    if (confirm('Are you sure about this?')) {
      this.uService.deleteUser(id).subscribe(() => {
        // remove this user from the array
        this.users.splice(index, 1);
      });
    } else {
      return this.users;
    }
  }
}
