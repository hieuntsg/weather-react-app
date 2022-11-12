import * as React from 'react';
import { connect } from 'react-redux';

import { WeatherState } from '../../types/states';
import WeatherTable from '../WeatherTable';
import Error from '../Error';
import Loading from '../Loading';

import './Weather.css';

type Props = WeatherState;

export const Weather: React.FC<Props> = ({
  data,
  error,
  loading,
}) => {
  const dataWeather: any = data || {};
  let header = dataWeather.cityname ? `Current Weather in ${dataWeather.cityname}, ${dataWeather.country}` : '';
  return <React.Fragment>
    <section className="section">
      <div className="container is-centered" style={{ flex: 1 }}>
        {header && <div>
          <span className="is-size-4 has-text-weight-semibold">{header}</span>
          <br />
          <span className="is-size-3">
            {parseFloat(dataWeather.currentTemp).toFixed(1)}°C</span>
          <br />
        </div>}
        <div className='Weather'>
          {data && (
            <WeatherTable data={data} />
          )}
          {error && (
            <Error error={error} />
          )}
          {loading && (
            <Loading />
          )}
        </div>

      </div>
    </section>
  </React.Fragment>
};

const mapStateToProps = (state: WeatherState) => ({
  ...state,
});

export default connect(
  mapStateToProps,
  null,
)(Weather);
