import { Component, OnInit, Injectable, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UserService } from '../users/user.service';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { User } from '../interfaces/User';
import { FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable()
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild('searchRef') searchRef: ElementRef;
  search: string;
  users: User[];
  typeahead: FormControl = new FormControl();
  empty: boolean;
  observer: any = null;

  constructor(private uService: UserService,
              private router: Router) {
                this.observer = this.router.events.pipe(
                  filter(event => event instanceof NavigationEnd)
                ).subscribe(() => {
                  this.users = [];
                  this.searchRef.nativeElement.value = '';
                });
              }

  ngOnInit() {
    this.empty = true;
    this.users = [];
    fromEvent(this.searchRef.nativeElement, 'keyup')
    .pipe(
      map((evt: any) => {
        return evt.target.value;
      }),
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe((text: string) => {
      if (this.searchRef.nativeElement.value) {
        this.empty = false;
        return this.uService.searchUser(text).subscribe(result => {
          this.users = result;
        });
      } else {
        this.empty = true;
      }
    });
  }

  ngOnDestroy() {
    this.observer.unsubscribe();
  }
}
