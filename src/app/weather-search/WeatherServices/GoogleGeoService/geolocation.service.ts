import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/Rx";

@Injectable()
export class GeolocationService {
  private API_KEY: string = 'AIzaSyDe4Axc592y6NV3Dv__cBd63zd4O3k8F3A';
  private API_URI: string = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: Http) { }

  searchForAutoCompletionCandidates(query: string): Observable<string[]> {
    return this.http.get(this.buildRequestURI(query)).
      map((result) => {
        let res: any[] = result.json().results;
        let candidates: string[] = [];
        for (let candidate of res) {
          candidates.push(candidate['formatted_address']);
        }
        return candidates;
    });
  }



  searchForLocation(query: string): Observable<Location> {
    return this.http.get(this.buildRequestURI(query))
      .map((res:any) => {
          let geo: any = res.json().results[0].geometry.location;
          return new Location(geo.lat, geo.lng);
      });
  }


  private buildRequestURI(q: string): string {
    return `${this.API_URI}?address=${q}&key=${this.API_KEY}`;
  }
}

export class Location {
  constructor(public lat: string, public lon: string) {
  }

  public getLatitude(): string {
    return this.lat;
  }

  public getLongitude(): string {
    return this.lon;
  }
}
