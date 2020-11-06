import React, { useEffect, useState } from "react";
import Languages from "./Languages";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      });
  }, [country.name]);
  if (weather !== null) {
    return (
      <div>
        <h1>{country.name}</h1>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>

        <h2>Languages</h2>
        <Languages languages={country.languages} />

        <br />

        <div>
          <img alt={country.name} src={country.flag} width="200px" />
        </div>

        <h2>Weather in {country.name}</h2>
        <div>
          <strong>Temperature:</strong> {weather.current.temperature} Celsius
        </div>
        <div>
          <img
            alt={country.name}
            src={weather.current.weather_icons[0]}
            width="75px"
          />
        </div>
        <div>
          <strong>Wind:</strong> {weather.current.wind_speed} kph direction{" "}
          {weather.current.wind_dir}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{country.name}</h1>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>

        <h2>Languages</h2>
        <Languages languages={country.languages} />

        <br />

        <div>
          <img alt={country.name} src={country.flag} width="200px" />
        </div>

        <h2>Loading Weather for {country.name}....</h2>
      </div>
    );
  }
};

export default CountryDetails;
