import {Component, OnInit, EventEmitter, OnChanges, SimpleChange, SimpleChanges, Input} from '@angular/core';
import { FormControl } from '@angular/forms'

import { GeolocationService } from '../WeatherServices/GoogleGeoService/geolocation.service';


@Component({
  selector: 'app-search-bar',
  outputs: ['submittedQuery'],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnChanges {
  private searchInput: FormControl = new FormControl("");
  private queryBuilt: boolean = false;
  private submittedQuery: EventEmitter<string> = new EventEmitter<string>();
  @Input() qq: string;

  constructor(private locationService: GeolocationService) { }

  private queryCandidates: string[] = [];

  private clearQueryCandidates(): void {
    this.queryCandidates = [];
  }

  ngOnChanges(change: SimpleChanges) {
    this.searchInput.setValue(this.qq);
  }

  private submitQuery(query: string) {
    this.submittedQuery.emit(query);
    this.searchInput.setValue(query);
  }

  ngOnInit() {
    this.searchInput.valueChanges
      .filter((q: string) => {
      if (q.trim().length == 0
          || this.queryCandidates.length > 0
             && q == this.queryCandidates[0]) {
          this.clearQueryCandidates();
          return false;
        }
        return q.trim().length > 3;
      })
      .debounceTime(250)
      .map((query) => this.locationService.searchForAutoCompletionCandidates(query))
      .switch()
      .subscribe(
        result => this.queryCandidates = result,
        err => console.log(err),
        () => console.log("finished")
      )
  }

  private selectCandidate(item: string) {
    this.searchInput.setValue(item);
    this.clearQueryCandidates();
  }

}
