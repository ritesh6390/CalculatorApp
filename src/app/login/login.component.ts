import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  // Common Properties
  loginForm: any
  submitted: boolean = false;
  isShowPassword: boolean = false;
  errorConstants: any;
  labelConstants: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    debugger
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required]],
    });
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/history']);
    }
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  clearLocalStorage() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  }

  onLogin() {
    debugger
    this.submitted = true;
    if (this.loginForm.invalid || !this.loginForm.value.Email || !this.loginForm.value.password) {
      return;
    }
    let LoginObj = {
      EmailId: this.loginForm.value.Email,
      Password: this.loginForm.value.password
    }
    let apiUrl = "account/login";
    this.commonService.doPost(apiUrl, LoginObj).pipe().subscribe({
      next: (response) => {
        if (response.success) {
          debugger
          this.storageService.setValue('authToken', response.data.jwtToken);
          this.storageService.setValue('email', response.data.emailId);
          this.storageService.setValue('userId', response.data.userId);
          this.storageService.setValue('userName', response.data.fullName);
          this.router.navigate(['/history']);
        }
        else {
          alert(response.message);
        }
      },
      error: (er) => {
        console.error(er);
        this.clearLocalStorage();
      },
    });
  }

}