import { Injectable } from '@angular/core';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private commonService: CommonService) { }

  isLoggedIn() {
    debugger
    const loginData = localStorage.getItem('authToken');
    if (loginData) {
      return true;
    }
    return false;
  }
}
