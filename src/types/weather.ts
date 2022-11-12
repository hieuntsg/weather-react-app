export interface City {
  name: string;
  country: string;
}

export interface Weather {
  city: string;
  list: {
    day: string;
    time: string;
    temp: string;
    icon: string;
    dt: number;
  }[];
  payload?: any;
  threeHrData?: any;
  dailyData?: any;
  cityname?: any;
  country?: any;
  currentTemp?: any;
}

export interface WeatherPayload {
  cod: string;
  name?: string;
  message: number;
  city: City;
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
  }[];

  payload?: any;
  threeHrData?: any;
  dailyData?: any;
  cityname?: any;
  country?: any;
  currentTemp?: any;
}
