import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router) { }

  public userRegistrationForm: FormGroup;


  ngOnInit(): void {
    this.userRegistrationForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    });
  }
  get urf() {
    return this.userRegistrationForm.controls;
  }

  public serverErrors = [];
  public showSuccessMsg: boolean = false;
  public showFailureMsg: boolean = false;
  public successMsg: string;


  formData = new FormData();
  upload(files: FileList) {
    this.formData.append(files.item.name, files.item(0));
  }


  register() {
    
    this.formData.append('myModel', JSON.stringify(this.userRegistrationForm.value));
    this.authservice.register(this.formData).subscribe(res => {
      this.successMsg = "Registered Successfully";
      //alert('Registration Successfull');
      this.showFailureMsg = false;
      this.showSuccessMsg = true;
      
      setTimeout(() => {
        this.showSuccessMsg = false;
      }, 10000);
      
      this.router.navigate(['./login']);
    }, err => {
      this.serverErrors = [];

      if (err.Status === 400) {
        Object.keys(err.error.errors).forEach(key => {
          this.serverErrors.push(err.error.errors[key][0]);
        });
      }

      else if (err.status === 500) {
        this.serverErrors.push("Admin is working on it!");
      }
      else if (err.status === 0) {
        console.log(err);
        this.serverErrors.push("API service seems to be down");
      }
      this.showFailureMsg = true;
      this.showSuccessMsg = false;
      setTimeout(() => {
        this.showFailureMsg = false;
      }, 10000);
    });
  }


  
}

