import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  successMessage: string;
  successClosed: boolean;
  id: string;
  user: User;
  status: any;

  profileForm = this.fb.group({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    skill: new FormControl('', Validators.required)
  });

  constructor(private fb: FormBuilder,
              private uService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.id = this.router.url.split('/')[2];
    this.successClosed = false;
    this.successMessage = '';
    this.uService.getUser(this.id).subscribe((result) => {
      this.user = result;

      this.profileForm.setValue({
        name: this.user.name,
        address: this.user.address,
        department: this.user.department,
        skill: this.user.skill
      })
    });
  }

  onSubmit() {
    return this.uService.updateUser(this.profileForm.value, this.id).subscribe(result => {
      this.successMessage = 'Successfully updated ' + result[`name`];
      this.profileForm.reset();
      this.router.navigate(['/users/', this.id]);
    });
  }

  onSuccessClose() {
    this.successClosed = true;
  }


}
