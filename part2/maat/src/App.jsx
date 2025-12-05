import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import countryService from './services/countryServices';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then((data) => {
      setCountries(data || []);
    });
  }, []);
  const filteredCountries = countries.filter((country) => {
    const name = country.name?.common || country.name || '';
    return name.toLowerCase().includes(filter.trim().toLowerCase());
  });

  // If a country has been selected via 'show', render only its details
  if (selectedCountry) {
    return (
      <div>
        <CountryDetails
          country={selectedCountry}
          onBack={() => setSelectedCountry(null)}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Country search (basic)</h1>
      <Filter
        filter={filter}
        setFilter={(value) => {
          setSelectedCountry(null);
          setFilter(value);
        }}
      />
      <p>Current filter: {filter}</p>
      <p>Countries loaded: {countries.length}</p>

      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <div>
          <h3>Matching countries</h3>
          <CountryList
            countries={filteredCountries}
            onShow={(c) => setSelectedCountry(c)}
          />
        </div>
      )}

      {filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}
    </div>
  );
};

export default App;
