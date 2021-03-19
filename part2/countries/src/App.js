import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  console.log(country);
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
    </div>
  );
};

const SearchResult = ({ searchResults }) => {
  const [clicked, setClicked] = useState(false);
  const [country, setCountry] = useState(searchResults);

  if (searchResults.length > 10) {
    console.log(
      "Too many matches, specify another filter",
      searchResults.length
    );
    return <div>Too many matches, specift another filter</div>;
  } else if (searchResults.length < 10 && searchResults.length > 1) {
    console.log("Just show the countries name", searchResults.length);
    return (
      <div>
        {searchResults.map((result) => {
          return (
            <li key={result.name} style={{ listStyle: "none" }}>
              {result.name}{" "}
              <button
                onClick={() => {
                  setClicked(!clicked);
                  setCountry(result);
                }}
              >
                show
              </button>
            </li>
          );
        })}
        {clicked ? <Country country={country}></Country> : ""}
      </div>
    );
  } else if (searchResults.length === 1) {
    console.log("Show the country details", searchResults.length);
    const country = searchResults[0];
    return <Country country={country}></Country>;
  }
  return <div>Please enter a filter</div>;
};

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled!");
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    let value = event.target.value;
    setSearch(value);

    setSearchResult(
      countries.filter((country) => {
        console.log(country.name.toLowerCase());
        return country.name.toLowerCase().includes(value.toLowerCase());
      })
    );
    console.log("printing countries after searching: ", searchResult);
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
