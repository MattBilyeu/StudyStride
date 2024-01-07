import { Component, OnInit } from '@angular/core';
import { Stats } from '../../models/stats.model';
import { HttpService } from '../../service/http.service';

interface userCounts {
  activeUsers: number,
  allUsers: number
}

@Component({
  selector: 'app-app-stats',
  templateUrl: './app-stats.component.html',
  styleUrl: './app-stats.component.css'
})
export class AppStatsComponent implements OnInit {
  appObject: Stats;
  userCounts: userCounts;

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.getStatsObject().subscribe((statsObj: Stats) => {
      statsObj.totalStudyTime = Math.round(+statsObj.totalStudyTime*100)/100
      this.appObject = statsObj
    });
    this.http.getActiveUserCount().subscribe((counts: userCounts) => {
      this.userCounts = counts
    })
  }
}
