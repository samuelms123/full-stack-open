import StatisticLine from './StatisticLine';
const Statistics = ({ stats }) => {
  const { good, neutral, bad } = stats;
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

  return total === 0 ? (
    <p>No feedback given</p>
  ) : (
    <table>
      <tbody>
        <StatisticLine statName="good" value={good} />
        <StatisticLine statName="neutral" value={neutral} />
        <StatisticLine statName="bad" value={bad} />
        <StatisticLine statName="all" value={total} />
        <StatisticLine statName="average" value={average.toFixed(1)} />
        <StatisticLine
          statName="positive"
          value={positivePercentage.toFixed(1) + ' %'}
        />
      </tbody>
    </table>
  );
};

export default Statistics;
