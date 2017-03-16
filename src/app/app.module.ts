import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { SearchBarComponent } from './weather-search/search-bar/search-bar.component';
import { SearchResultComponent } from './weather-search/search-result/search-result.component';

// bootstrap 4 for ng2
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// charjs for ng2
import { ChartsModule } from 'ng2-charts/ng2-charts';


import { GeolocationService } from './weather-search/WeatherServices/GoogleGeoService/geolocation.service';

import {
  RouterModule,
  Routes
} from '@angular/router'

import {WeatherForecastService} from "./weather-search/WeatherServices/weather-forecast.service";
import {DarkSkyWeatherService} from "./weather-search/WeatherServices/DarkskyService/darksky-weather.service";

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: WeatherSearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    WeatherSearchComponent,
    SearchBarComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ChartsModule,
  ],
  providers: [
    GeolocationService,
    WeatherForecastService,
    DarkSkyWeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
