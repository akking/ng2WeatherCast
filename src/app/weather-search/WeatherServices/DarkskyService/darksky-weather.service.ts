import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/Rx";
import { WeatherForecastResult } from '../WeatherForecastResult.model';

@Injectable()
export class DarkSkyWeatherService {
  private preFix : string = 'https://cors-anywhere.herokuapp.com/';
  private apiURL: string = 'https://api.darksky.net/forecast/';
  private apiKey: string = '094074daea10ffa7fee7f9b835eb7b35';


  constructor(private http: Http) {
  }

  forecastRequest(latitude: string, longitude: string): Observable<WeatherForecastResult> {
    let parameters = DarkSkyWeatherService.buildQuery(latitude, longitude, "");
    let requestURL = this.preFix + this.apiURL + this.apiKey + "/" + parameters;
    console.log("Request url: ", requestURL);
    return this.http.get(requestURL)
      .map((res: any) => new WeatherForecastResult(res.json()));
  }

  static buildQuery(lat, lon, time): string {
    return lat + "," + lon;
  }
}
