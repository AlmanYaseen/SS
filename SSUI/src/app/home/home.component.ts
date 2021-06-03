import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { ApiServices } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(public service: ApiServices ,public authService: AuthService, private localStorage: LocalStorageService) { }
  public imageToShow: any;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Pending', 'Approved'];
  public pieChartData: SingleDataSet = [0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartLabels: Label[] = ['Short Stories'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [0], label: 'Pending' },
    { data: [0], label: 'Approved' }
  ];

  pending: number = 0;
  approved: number = 0;

  
  ngOnInit(): void {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

    if (this.authService.isAuthenticated) {
      // this.id= this.localStorage.get("Obj").id;
      this.authService.getProfilePic().subscribe(res => {
        let reader = new FileReader();
        reader.addEventListener("load", x => { this.imageToShow = reader.result; });
        reader.readAsDataURL(res);
      });
    }

    this.service.getStories().subscribe(res => {
      if (this.localStorage.get("Obj").role == 'Admin') {
        this.pending = res.filter(x => x.isApproved == false).length;
        this.approved = res.filter(x => x.isApproved == true).length;
      }
      else {
        this.pending = res.filter(x => x.isApproved == false && x.id == this.localStorage.get("Obj").id).length;
        this.approved = res.filter(x => x.isApproved == true && x.id == this.localStorage.get("Obj").id).length;
      }

      this.pieChartData = [this.pending, this.approved];
      this.barChartData = [
        { data: [this.pending], label: 'Pending' },
        { data: [this.approved], label: 'Approved' }
      ];

    });
  }
}
