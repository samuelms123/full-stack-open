const CountryDetails = ({ country }) => {
  if (!country) return null;

  const name = country.name?.common || country.name;
  const capital = country.capital ? country.capital.join(', ') : 'N/A';
  const area = country.area || 'N/A';
  const flag = country.flags?.png || country.flags?.svg || '';
  const languages = country.languages ? Object.values(country.languages) : [];

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      {flag && (
        <div>
          <img src={flag} alt={`flag of ${name}`} style={{ width: '150px' }} />
        </div>
      )}
      <h3>Languages:</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountryDetails;
