import axios from "axios";

import { transformPayload } from "./factory";

const API_URL = "http://api.openweathermap.org/data/2.5/";
const API_KEY = "aac94666fd0b8641675125039b6e6c22";
const DEFAULT_ID = 1819729;
//process.env.REACT_APP_API_KEY;

export const getWeatherByCityName = (city: string) =>
  axios({
    method: "get",
    baseURL: API_URL,
    url: "forecast",
    params: {
      q: city,
      id: DEFAULT_ID,
      units: "metric",
      APPID: API_KEY,
    },
  })
    .then(({ data }) => data)
    .then(transformPayload);

export default {
  getWeatherByCityName,
};
