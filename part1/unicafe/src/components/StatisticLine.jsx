const StatisticLine = ({ statName, value }) => {
  return (
    <tr>
      <td>{statName}</td>
      <td>{value}</td>
    </tr>
  );
};

export default StatisticLine;
