import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  HistoryList: any = [];
  constructor(private http: HttpClient,
    private CommonService: CommonService,
    private router: Router
   ) {
  }
  ngOnInit() {
    this.getHistorylist();
  }
  Logout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getHistorylist(){
    debugger
   
        const apiUrl = "Calculate/list";
      this.CommonService.doGet(apiUrl).pipe().subscribe({
      next: (data) => {
        if (data.success) {
          //let totalRecords = 0;
          if (data.data.length > 0) {
            this.HistoryList = data.data;
          }
         
        }
        else {
        }
      },
      error: (er) => {
        console.error(er)
      },
      complete: () => console.info('complete')
    });
  }
 
}
