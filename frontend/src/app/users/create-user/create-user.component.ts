import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

@Injectable()
export class CreateUserComponent implements OnInit {
  profileForm = this.fb.group({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    skill: new FormControl('', Validators.required)
  });

  successMessage: string;
  successClosed: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private uService: UserService) { }

  ngOnInit() {
    this.successClosed = false;
    this.successMessage = '';
  }

  onSubmit() {
    return this.uService.createUser(this.profileForm.value).subscribe((result) => {
      this.router.navigate(['/users/', result.id]);
    });
  }

  onSuccessClose() {
    this.successClosed = true;
  }

}
