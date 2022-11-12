import moment from "moment";

import { WeatherPayload, Weather } from "../../types/weather";

const ICON_URL = "https://openweathermap.org/img/w/";

export function offsetDateTime(current: any, offset: any) {
  return moment(current).add(offset, "hours").format("YYYY-MM-DD hh a");
}

const convertDataSereverSide = (data: any) => {
  //Data processing here
  //Set timezone offset
  let offset = data["city"]["timezone"] / 3600;
  data = data["list"];
  //Process data for 3 hour view
  let threeHrData: any = {};
  let dateList = [];

  //Loop through each 3hr period
  for (let i = 0; i < data.length; i++) {
    //Get local time
    let offset_datetime = offsetDateTime(data[i]["dt_txt"], offset);
    let date, time, ampm;
    [date, time, ampm] = offset_datetime.split(" ");

    if (!(date in threeHrData)) {
      threeHrData[date] = [];
      dateList.push(date);
    }
    threeHrData[date].push({
      time: parseInt(time) + ampm,
      temp_min: data[i]["main"]["temp_min"],
      temp_max: data[i]["main"]["temp_max"],
      weather: data[i]["weather"][0]["description"],
      weatherid: data[i]["weather"][0]["id"],
      wind: data[i]["wind"]["speed"],
      deg: data[i]["wind"]["deg"],
      icon: data[i]["weather"][0]["icon"],
    });
  }

  //Process data for daily summary
  let dailyData: any = {};
  Object.keys(threeHrData).forEach((date) => {
    let temp_max = -999;
    let temp_min = 999;
    let worst_weather_id = 0;
    let cloud_weather_id = 800;
    let worst_weather = "";
    let cloud_weather = "clear sky";
    let wind_max = 0;
    let worst_weather_icon = "";
    let cloud_weather_icon = "01d";
    //Get min/max temp, and worst weather and wind for that day.
    for (let i = 0; i < threeHrData[date].length; i++) {
      if (threeHrData[date][i]["temp_max"] > temp_max)
        temp_max = threeHrData[date][i]["temp_max"];
      if (threeHrData[date][i]["temp_min"] < temp_min)
        temp_min = threeHrData[date][i]["temp_min"];
      if (threeHrData[date][i]["wind"] > wind_max)
        wind_max = threeHrData[date][i]["wind"];
      if (
        threeHrData[date][i]["weatherid"] > worst_weather_id &&
        threeHrData[date][i]["weatherid"] < 800
      ) {
        worst_weather_id = threeHrData[date][i]["weatherid"];
        worst_weather = threeHrData[date][i]["weather"];
        worst_weather_icon = threeHrData[date][i]["icon"];
      }

      if (threeHrData[date][i]["weatherid"] > cloud_weather_id) {
        cloud_weather_id = threeHrData[date][i]["weatherid"];
        cloud_weather = threeHrData[date][i]["weather"];
        cloud_weather_icon = threeHrData[date][i]["icon"];
      }
    }

    /*For daily summary,
      If have multiple weather_id throughout the day, show the worst weather for that day.
      Show Highest weather_id within 0 < id < 800. Otherwise show the highest value from group 8xx (cloudy statuses).
    */
    let weather_id;
    let weather;
    let icon;
    if (worst_weather_id > 0) {
      weather_id = worst_weather_id;
      weather = worst_weather;
      icon = worst_weather_icon;
    } else {
      weather_id = cloud_weather_id;
      weather = cloud_weather;
      icon = cloud_weather_icon;
    }

    dailyData[date] = {
      temp_max: temp_max,
      temp_min: temp_min,
      weather_id: weather_id,
      weather: weather,
      wind_max: wind_max,
      icon: icon,
    };
  });

  let earliest_date = Object.keys(dailyData).sort()[0];
  return {
    threeHrData,
    dailyData,
    earliest_date
  }
};

// Open Weather API uses unix timestamp format
// JS does not, therefore, it is needed to use
// unix and utc functions from momentjs
export const transformPayload = (payload: WeatherPayload): Weather => {
  const data: any = convertDataSereverSide(payload);
  return {
    city: `${payload.city.name} ${payload.city.country}`,
    list: payload.list.map((item) => ({
      day: moment.unix(item.dt).utc().format("dddd"),
      time: moment.unix(item.dt).utc().format("h:mmA"),
      temp: `${Math.round(item.main.temp)}`,
      icon: `${ICON_URL}${item.weather[0].icon}.png`,
      dt: item.dt,
    })),
    // threeHrData: data.threeHrData,
    dailyData: data.dailyData,
    cityname: payload.city.name,
    country: payload.city.country,
    currentTemp: data.threeHrData[data.earliest_date][0]["temp_max"]
  };
};

export default {
  transformPayload,
};
