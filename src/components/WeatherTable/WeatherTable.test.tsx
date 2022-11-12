import React from "react";
import { shallow } from "enzyme";

import WeatherTable from "./";

describe("<WeatherTable />", () => {
  it("renders without crashing", () => {
    const ICON_URL = "https://openweathermap.org/img/w/";
    const data = {
      city: "Madrid ES",
      list: [
        {
          day: "Tuesday",
          time: "3:00PM",
          temp: "13",
          icon: `${ICON_URL}03d.png`,
          dt: 1556031600,
        },
        {
          day: "Tuesday",
          time: "6:00PM",
          temp: "10",
          icon: `${ICON_URL}03d.png`,
          dt: 1556042400,
        },
        {
          day: "Tuesday",
          time: "9:00PM",
          temp: "7",
          icon: `${ICON_URL}03d.png`,
          dt: 1556053200,
        },
        {
          day: "Wednesday",
          time: "12:00AM",
          temp: "6",
          icon: `${ICON_URL}03d.png`,
          dt: 1556064000,
        },
      ],
      dailyData: {
        "2022-11-11": {
          temp_max: 14.3,
          temp_min: 11.27,
          weather_id: 803,
          weather: "broken clouds",
          wind_max: 3.38,
          icon: "04n",
        },
        "2022-11-12": {
          temp_max: 16.07,
          temp_min: 10.39,
          weather_id: 804,
          weather: "overcast clouds",
          wind_max: 2.85,
          icon: "04n",
        },
        "2022-11-13": {
          temp_max: 15.23,
          temp_min: 11.3,
          weather_id: 804,
          weather: "overcast clouds",
          wind_max: 2.43,
          icon: "04n",
        },
        "2022-11-14": {
          temp_max: 13.35,
          temp_min: 10.54,
          weather_id: 500,
          weather: "light rain",
          wind_max: 1.88,
          icon: "10d",
        },
        "2022-11-15": {
          temp_max: 13.44,
          temp_min: 9.72,
          weather_id: 501,
          weather: "moderate rain",
          wind_max: 6.85,
          icon: "10n",
        },
        "2022-11-16": {
          temp_max: 11.05,
          temp_min: 8.81,
          weather_id: 500,
          weather: "light rain",
          wind_max: 5.63,
          icon: "10n",
        },
      },
    };
    const wrapper = shallow(<WeatherTable data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
