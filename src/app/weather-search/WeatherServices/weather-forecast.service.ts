import { Injectable } from '@angular/core';

import { DarkSkyWeatherService } from './DarkskyService/darksky-weather.service'
import { GeolocationService, Location } from './GoogleGeoService/geolocation.service'
import { WeatherForecastResult } from './WeatherForecastResult.model'
import {Observable} from "rxjs";
import "rxjs/Rx";

/*
** A "glue" to combine location service and weather forecast service
 */

@Injectable()
export class WeatherForecastService {

  constructor(private weatherService: DarkSkyWeatherService,
              private locationService: GeolocationService) { }

  public forecastFor(query: string): Observable<WeatherForecastResult> {
    let locationStream: Observable<Location> = this.locationService.searchForLocation(query);
    let forecastStream: Observable<WeatherForecastResult> =
      locationStream.map((loc: Location) =>
          this.weatherService.forecastRequest(loc.getLatitude(), loc.getLongitude())
        ).switch();
    return forecastStream;
  }

}
