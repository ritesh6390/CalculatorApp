import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ApiResponse } from '../models/commonModel';
import { AppService } from './App/app.service';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  IsError: boolean = false;
  ApiBaseUrl='https://localhost:7283/api/';
  constructor(private http: HttpClient, private appService: AppService) { }

  doGet(apiUrl: String): Observable<ApiResponse> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    let loginData = localStorage.getItem('authToken');
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData);
    
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', "*");
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
      httpOptions.headers = httpOptions.headers.
      set("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    }
    const url = `${environment.ApiBaseUrl}${apiUrl}`;

    return this.http.get<ApiResponse>(url, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        this.checkAuthorize(error);
        return throwError(() => error);
      })
    );
  }
  

  doPost(apiUrl: string, postData: any): Observable<ApiResponse> {

    debugger
    const httpOptions = {
      headers: new HttpHeaders(
      )
    };
    let loginData = localStorage.getItem('authToken');
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData);
    
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', "*");
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
      httpOptions.headers = httpOptions.headers.
      set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    }
    debugger
    const url = `${environment.ApiBaseUrl}${apiUrl}`;
    return this.http.post<ApiResponse>(url, postData, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        this.checkAuthorize(error);
        return throwError(() => error);
      })
    );
  }
  checkAuthorize(error:any) {
    if (error.status == HttpStatusCode.Unauthorized) {
      if (this.IsError == false) {
        this.IsError = true
        alert("Something went wrong ! Please try again after sometime.");
      }
      localStorage.clear();
      this.appService.logout();
    }
    else {
      let errorMessage = (error.error.message != null) ? error.error.message : error.message
    }
  }

}
