import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { WeatherService } from '../weather.service';
import { CategoryScale, Chart, TickOptions,registerables } from 'chart.js';
import { LineController, LineElement, PointElement, LinearScale, Title, Legend, Tooltip } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Legend, Tooltip,CategoryScale);
@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  location: any;
  forecastData: any;
  chart: Chart | undefined; 

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) { }

  // ngOnInit(): void {
  //   this.location = this.route.snapshot.paramMap.get('location');
  //   console.log(this.location)
  //   this.getWeatherForecast(this.location);
  // }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const location = params.get('location');
      this.location = location ?? ''; // Use optional chaining operator to handle null value
      this.getWeatherForecast(this.location);
    });
  }

  getWeatherForecast(location: string) {
    this.weatherService.getWeatherForecast(location).subscribe(data => {
      this.forecastData = data;
      // Here you can parse the JSON response and extract necessary data for the chart
      console.log(this.forecastData);
      this.createChart();
    });
    
  }
  createChart() {
    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart if it exists
    }
    const temperatures = this.forecastData.properties.periods.map((period:any) => period.temperature);
    const labels = this.forecastData.properties.periods.map((period:any) => period.name);
  
    const ctx = document.getElementById('temperatureChart') as HTMLCanvasElement;
    console.log(ctx)
    this.chart= new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature (F)',
          data: temperatures,
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: {
              type: 'category',
              // Other x-axis options...
          },
          y: {
              // Other y-axis options...
          }
      }
      }
    });
  }
}