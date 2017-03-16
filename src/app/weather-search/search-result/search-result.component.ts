import {Component, OnInit, Input, EventEmitter, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {WeatherForecastResult} from "../WeatherServices/WeatherForecastResult.model";
import "rxjs/Rx";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styles: [
    './WeatherIcon/weather-icons.min.css',
  ]
})
export class SearchResultComponent implements OnInit, OnChanges {
  @Input() result: WeatherForecastResult;
  dailyDataForChart: any[];
  hourlyDataForChart: any[];
  hourlyLabelForChart: any[];

  constructor() {
  }

  getForecast() {
    console.log(this.result);
    console.log(this.result.daily.data);
  }

  getIcon(i: string): string {
    return WeatherForecastResult.convertWebserviceIconToCSS(i);
  }

  private populateData() { // populate the data for charts when the weather data changes
      this.dailyDataForChart = WeatherForecastResult.getNextSevenDayForecast(this.result);
      console.log(this.dailyDataForChart);
      [this.hourlyDataForChart, this.hourlyLabelForChart] = WeatherForecastResult.get24HourForecast(this.result);
  }

  private getRoundNumber(s: string): string { // get the whole number of temperature
    return String(s).split(".")[0];
  }

  private getDay(s: any): string {
    return WeatherForecastResult.convertTimeToDay(s);
  }



  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes detected: ", changes);
    this.populateData();
  }

  // below is chart config
  public lineChartOptions:any = {
    animation: false,
    responsive: true,
    hover: {
      animationDuration: 0
    },
    tooltips: {
      tooltipTemplate: "<%= value %>",

      showTooltips: true,

      onAnimationComplete: function () {
        this.showTooltip(this.datasets[0].points, true);
      },
      tooltipEvents: []
    }

  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line'

}
