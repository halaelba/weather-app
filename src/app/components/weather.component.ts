import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Weather } from '../models/Weather.model';
import { WeatherDataService } from '../services/weather-data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weather!: Weather
  loading: boolean = true

  selectCityForm = new FormControl();
  citiesOptions: string[] = ['Cologne', 'Stockholm', 'Oslo', 'Damascus', 'Bonn', 'Tokyo', 'Berlin', 'Los Angeles',
      'Houston', 'Jakarta', 'Delhi'];
  filteredOptions!: Observable<string[]>;

  constructor(private weatherDataService: WeatherDataService,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
      this.initFilteredOptions();
      this.loadWeatherByCity(this.citiesOptions[0])
  }

  private initFilteredOptions() {
    this.filteredOptions = this.selectCityForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.citiesOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  loadWeatherByCity(city: string) {
    this.weatherDataService.LoadWeatherByCity(city).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.weather = new Weather(res);
        console.log(this.weather);
      }
    );
  }

  // DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing values to be safe to use in the different DOM contexts.
  getSantizeUrl(url : string) {
    const prefixUrl = 'http://openweathermap.org/img/wn/';
    return this.sanitizer.bypassSecurityTrustUrl(`${prefixUrl}${url}@2x.png`);
  }



}
