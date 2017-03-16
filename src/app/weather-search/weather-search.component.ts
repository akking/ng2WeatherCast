import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router'

import {WeatherForecastService} from "./WeatherServices/weather-forecast.service";
import {WeatherForecastResult} from './WeatherServices/WeatherForecastResult.model'
import {Observable} from "rxjs";

@Component({
  selector: 'app-weather-search',
  outputs: ['result', 'submittedQuery'],
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {
  submittedQuery: string;
  public result: WeatherForecastResult;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private forcastService: WeatherForecastService) {
    this.route.queryParams.subscribe(
      paras => this.submittedQuery = paras['query'] || ''
    )
  }

  private searchForQuery(q: string) {
    this.router.navigate(['search'], {
      queryParams: { query: q}
    }).then( _ => this.getForecast());
  }

  private getForecast() {
    if (!this.submittedQuery) {
      return;
    }
    this.forcastService.forecastFor(this.submittedQuery).subscribe(
        res => this.result = res,
        err => console.log(err),
        () => console.log("stream completed")
      )
  }

  ngOnInit() {
    this.getForecast();
  }

}
