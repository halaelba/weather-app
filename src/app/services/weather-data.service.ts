import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/';
  private apiId: string = '';

  constructor(private http: HttpClient) { }

  LoadWeatherByCity(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}weather?q=${city}&units=metric&appid=${this.apiId}`)
  }

}
