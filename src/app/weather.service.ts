import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherForecast(location: string): Observable<any> {
    const points='31,80'
     let apiUrl = `https://api.weather.gov/gridpoints/${location}/${ points}/forecast`;
    
    return this.http.get(apiUrl);
   
    
  }
}