import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  const countriesToShow =
    newFilter.length === 0
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <Countries
        handleFilterChange={handleFilterChange}
        countries={countriesToShow}
        filter={newFilter}
      />
    </div>
  );
};

export default App;
