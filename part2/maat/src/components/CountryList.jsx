const CountryList = ({ countries, onShow }) => {
  return (
    <ul>
      {countries.map((c) => (
        <li key={c.name.common || c.name}>
          {c.name?.common || c.name}
          {onShow && (
            <button style={{ marginLeft: '8px' }} onClick={() => onShow(c)}>
              show
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
