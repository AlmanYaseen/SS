import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, private localStorage: LocalStorageService) { }
  public imageToShow: any;
  id: string;
  ngOnInit(): void {
    
    if (this.authService.isAuthenticated) {
     // this.id= this.localStorage.get("Obj").id;
      this.authService.getProfilePic().subscribe(res => {
        let reader = new FileReader();
        reader.addEventListener("load", x => { this.imageToShow = reader.result; });
        reader.readAsDataURL(res);
      });
    }

  }

}
