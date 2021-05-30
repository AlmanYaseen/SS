import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Loginvm } from '../models/loginvm';
import { Ssuser } from '../models/ssuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl: string = "http://localhost:50000/api/Account";
  public isAuthenticated: boolean = false;

  constructor(private api: HttpClient, private localStorage: LocalStorageService) {
    if (this.localStorage.get("Obj")) {
      this.isAuthenticated = true;
    }
  }

  register(formData: FormData) {
    return this.api.post<Ssuser>(this.baseUrl + "/register", formData  );
  }

  login(loginUser: Loginvm) {
    
    return this.api.post<any>(this.baseUrl + "/login", loginUser, { withCredentials: true});
  }

  logout() {
    return this.api.post<any>(this.baseUrl + "/logout", null, { withCredentials: true });
  }


  //id: number;
  getProfilePic() {
    
    return this.api.get(this.baseUrl + "/getProfilePic", { responseType: "blob", withCredentials: true }, );
  }
}
