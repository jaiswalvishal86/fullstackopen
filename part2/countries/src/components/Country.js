import React from "react";

const Country = ({ handleFilterChange, country }) => {
  return (
    <div>
      <li>
        {country.name}
        <button value={country.name} onClick={handleFilterChange}>
          show
        </button>
      </li>
    </div>
  );
};

export default Country;
