import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { UserService } from '../user.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

@Injectable()
export class UserComponent implements OnInit, OnDestroy {
  user: User;
  id: string;
  observer: any = null;

  constructor(private uService: UserService,
              private router: Router) {
                this.observer = router.events.pipe(
                  filter(event => event instanceof NavigationEnd)
                ).subscribe(() => {
                  if (this.id) {
                    this.getData();
                  }
                });
              }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    this.observer.unsubscribe();
  }

  getData() {
    this.id = this.router.url.split('/')[2];
    if (this.id) {
      this.uService.getUser(this.id).subscribe(result => {
        this.user = result;
      });
    }
  }

  onDeleteUser(id) {
    if (confirm('Are you sure about this?')) {
      this.uService.deleteUser(id).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      return this.user;
    }
  }


}
