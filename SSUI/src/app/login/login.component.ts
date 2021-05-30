import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private localStorage: LocalStorageService,
  ) { }

   userLoginForm: FormGroup;
  ngOnInit() {
    this.userLoginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get ulf() {
    return this.userLoginForm.controls;
  }


  


  login() {
    this.authservice.login(this.userLoginForm.value).subscribe(res => {
      alert("Logged in Successfully\n Press (OK)");
      console.log(res);
      this.localStorage.set("Obj", res);
      this.authservice.isAuthenticated = true;
      this.router.navigate(['./home']);
    });
    
  }
}
