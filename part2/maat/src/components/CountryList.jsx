const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((c) => (
        <li key={c.name.common || c.name}>{c.name?.common || c.name}</li>
      ))}
    </ul>
  );
};

export default CountryList;
