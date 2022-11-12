import * as React from 'react';

import { Weather } from '../../types/weather';
import moment from "moment";
import './WeatherTable.css';

type Props = {
  data: Weather
};

const WeatherTable: React.FC<Props> = ({ data }) => {
  const month_map: any = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  };
  if (Object.keys(data.dailyData).length === 0) return (null);

  return <React.Fragment>
    <hr />
    <nav className="level">
      {Object.keys(data.dailyData).map((date, i) => (
        <div key={`daily${date}`} className="level-item has-text-centered clickableBox paddedBox">
          <div>
            <p>
              {parseInt(date.split("-")[2])}&nbsp;{month_map[parseInt(date.split("-")[1])]}&nbsp;{parseInt(date.split("-")[0])}
              <br />
              <p className="is-size-4">{moment(date).utc().format("dddd")}</p>
            </p>
            <img src={`https://openweathermap.org/img/wn/${data.dailyData[date]["icon"]}@2x.png`} width="50px" height="50px" alt="icon" />
            <br />

            {parseFloat(data.dailyData[date]["temp_min"]).toFixed(1)} - {parseFloat(data.dailyData[date]["temp_max"]).toFixed(1)}°C<br />

            {(data.dailyData[date]["weather"])}<br />

              Wind: {(data.dailyData[date]["wind_max"])}m/s

            </div>
        </div>
      ))}
    </nav>
    <hr />
  </React.Fragment>
};

export default WeatherTable;
