import factory from "./factory";
import mock from "./mock-data";

describe("Weather factory", () => {
  it("creates weather", () => {
    const ICON_URL = "https://openweathermap.org/img/w/";
    const payload = mock.madrid;
    const weather = factory.transformPayload(payload);

    expect(weather).toEqual({
      city: "Madrid ES",
      cityname: "Madrid",
      country: "ES",
      currentTemp: 14.3,
      dailyData: {
        "2022-11-11": {
          icon: "04n",
          temp_max: 14.3,
          temp_min: 11.27,
          weather: "broken clouds",
          weather_id: 803,
          wind_max: 3.38,
        },
        "2022-11-12": {
          icon: "04n",
          temp_max: 16.07,
          temp_min: 10.39,
          weather: "overcast clouds",
          weather_id: 804,
          wind_max: 2.85,
        },
        "2022-11-13": {
          icon: "04n",
          temp_max: 15.23,
          temp_min: 11.3,
          weather: "overcast clouds",
          weather_id: 804,
          wind_max: 5.63,
        },
      },
      list: [
        {
          day: "Tuesday",
          dt: 1556031600,
          icon: "https://openweathermap.org/img/w/04n.png",
          temp: "13",
          time: "3:00PM",
        },
        {
          day: "Tuesday",
          dt: 1556042400,
          icon: "https://openweathermap.org/img/w/04n.png",
          temp: "10",
          time: "6:00PM",
        },
        {
          day: "Tuesday",
          dt: 1556053200,
          icon: "https://openweathermap.org/img/w/04n.png",
          temp: "7",
          time: "9:00PM",
        },
        {
          day: "Wednesday",
          dt: 1556064000,
          icon: "https://openweathermap.org/img/w/04n.png",
          temp: "6",
          time: "12:00AM",
        },
      ],
    });
  });
});
