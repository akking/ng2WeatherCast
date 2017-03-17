/**
 * Created by DLI on 11/19/16.
 */
export class WeatherForecastResult {
  public currently: any;
  public minutely: any;
  public hourly: any;
  public daily: any;

  constructor(obj?: any) {
    this.currently = obj && obj.currently || null;
    this.minutely = obj && obj.minutely || null;
    this.hourly = obj && obj.hourly || null;
    this.daily = obj && obj.daily || null;
  }

  static get24HourForecast(data: WeatherForecastResult): any[] {
    let forecast: any[] = [
      {data: [], label: '24 hour forecast'}
    ];
    let labels: string[] = [];
    if(data && data.hourly) {
      let index = 0;
      for (let eachHour of data.hourly.data) {
        if (index > 23) {
          break;
        }
        forecast[0].data.push(
          Number(eachHour['apparentTemperature'])
        );
        labels.push(
          new Date(eachHour.time * 1000).getHours().toString()
        );
        index++;
      }
    }
    return [forecast, labels];
  }

  static DAYS: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  static convertTimeToDay(s: string) {
    return WeatherForecastResult.DAYS[new Date(parseInt(s) * 1000).getDay()];
  }


  static IconToCssMapping: {[key: string]: string}= {
    "clear-day": "wi-day-sunny", "clear-night": "wi-night-clear",
    "rain": "wi-rain", "snow": "wi-snow", "sleet": "sleet", "wind": "wi-windy", "fog": "wi-fog",
    "cloudy": "wi-cloudy", "partly-cloudy-day": "wi-day-cloudy", "partly-cloudy-night": "wi-night-cloudy"
  };

  getHourlyIcon(): string {
    return WeatherForecastResult.IconToCssMapping[this.hourly.icon];
  }

  static getNextSevenDayForecast(data: WeatherForecastResult): any[] {
    if (!data) {
      return [];
    }
    return data.daily.data;
  }

  static convertWebserviceIconToCSS(webIcon: string): string {
    return WeatherForecastResult.IconToCssMapping[webIcon];
  }

}
