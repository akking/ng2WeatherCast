/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WeatherForecastService } from './weather-forecast.service';

describe('Service: WeatherForecast', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherForecastService]
    });
  });

  it('should ...', inject([WeatherForecastService], (service: WeatherForecastService) => {
    expect(service).toBeTruthy();
  }));
});
