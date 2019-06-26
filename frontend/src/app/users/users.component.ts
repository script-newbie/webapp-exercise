import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

@Injectable()
export class UsersComponent implements OnInit {

  users: any;
  constructor(private uService: UserService) { }

  ngOnInit() {
    this.uService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

}
