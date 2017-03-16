/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DarkSkyWeatherService } from './darksky-weather.service';

describe('Service: DarkskyWeather', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DarkSkyWeatherService]
    });
  });

  it('should ...', inject([DarkSkyWeatherService], (service: DarkSkyWeatherService) => {
    expect(service).toBeTruthy();
  }));
});
