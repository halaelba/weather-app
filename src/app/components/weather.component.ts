import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Weather } from '../models/Weather.model';
import { WeatherDataService } from '../services/weather-data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weather!: Weather;
  loading: boolean = true

  constructor(private weatherDataService: WeatherDataService,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // TODO unsubscribe?
    this.weatherDataService.LoadWeatherByCity('Cologne').subscribe(
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
