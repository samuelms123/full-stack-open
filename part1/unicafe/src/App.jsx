import { useState } from 'react';
import Header from './components/Header.jsx';
import Statistics from './components/Statistics.jsx';
import Button from './components/Button.jsx';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
  };

  const handleButtonClick = (setter, value) => {
    setter(value + 1);
  };

  return (
    <>
      <Header text="Give feedback" />
      <div>
        <Button
          handleClick={() => handleButtonClick(setGood, good)}
          text="good"
        />
        <Button
          handleClick={() => handleButtonClick(setNeutral, neutral)}
          text="neutral"
        />
        <Button handleClick={() => handleButtonClick(setBad, bad)} text="bad" />
      </div>
      <Header text="Statistics" />
      <Statistics stats={stats} />
    </>
  );
};

export default App;
