import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import {ServiceService} from '../service.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = []
  dataSource = new MatTableDataSource();
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  show=false;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,255,0,0.3)' ],
    },
  ];

  constructor(private myService: ServiceService ) { }

  ngOnInit() { }
  
searchQuery(quey){
  this.show=false;
  this.mode = 'indeterminate' ;
  this.myService.serchQuery(quey).subscribe(data => {this.pieChartData = data['PieChart'][1],
  this.pieChartLabels = data['PieChart'][0],
  this.dataSource=data['Table'],
  this.displayedColumns = ['arabic_tweet', 'translated_tweet', 'neg', 'neu','pos', 'compound','class'];
  this.mode = 'determinate' ;
  this.show=true
 })
}

   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
