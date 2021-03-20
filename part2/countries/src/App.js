import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(undefined);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  if (weather === undefined) {
    return <div>Loading Temperature data</div>;
  } else {
    return (
      <div>
        <h2>Weather in {country.name}</h2>
        <strong>Temperature:</strong> {weather.current.temperature} Celcius{" "}
        <br />
        <img src={weather.current.weather_icons} alt="" />
        <br />
        <strong>Wind: </strong>
        {weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </div>
    );
  }
};

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital} <br />
      popluation {country.population}
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}{" "}
      </ul>
      <br />
      <img src={country.flag} alt="Country Flag" width="150px" height="150px" />
      <br />
      <Weather country={country}></Weather>
    </div>
  );
};

const SearchResult = ({ searchResults }) => {
  const [clicked, setClicked] = useState(false);
  const [country, setCountry] = useState(searchResults);

  const handleClick = (result) => {
    if (result.name === country.name) {
      setClicked(!clicked);
    } else {
      setClicked(true);
    }
    setCountry(result);
  };

  if (searchResults.length > 10) {
    return <div>Too many matches, specift another filter</div>;
  } else if (searchResults.length < 10 && searchResults.length > 1) {
    return (
      <div>
        {searchResults.map((result) => {
          return (
            <li key={result.name} style={{ listStyle: "none" }}>
              {result.name}{" "}
              <button onClick={() => handleClick(result)}>show</button>
            </li>
          );
        })}
        {clicked ? <Country country={country}></Country> : ""}
      </div>
    );
  } else if (searchResults.length === 1) {
    const country = searchResults[0];
    return <Country country={country}></Country>;
  }
  return <div>Please enter a filter</div>;
};

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    let value = event.target.value;
    setSearch(value);

    setSearchResult(
      countries.filter((country) => {
        return country.name.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  return (
    <div>
      find countries
      <input type="text" value={search} onChange={handleSearch} />
      <SearchResult searchResults={searchResult}></SearchResult>
    </div>
  );
}

export default App;
