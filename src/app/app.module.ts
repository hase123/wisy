import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './weather.service'; // Import your WeatherService

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Include HttpClientModule here
  ],
  providers: [WeatherService], // Provide WeatherService here if needed
  bootstrap: [AppComponent]
})
export class AppModule { }