import React, { useState } from "react";

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  if (total > 0) {
    return (
      <div>
        <Statistic text="good" value={props.good}></Statistic>
        <Statistic text="neutral" value={props.neutral}></Statistic>
        <Statistic text="bad" value={props.bad}></Statistic>
        <Statistic text="all" value={total}></Statistic>
        <Statistic
          text="average"
          value={(props.good * 1 + props.bad * -1) / total}
        ></Statistic>
        <Statistic
          text="positive"
          value={(props.good / total) * 100}
        ></Statistic>
      </div>
    );
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
};

const Statistic = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="Give Feedback"></Header>
      <Button text="good" handleClick={() => setGood(good + 1)}></Button>
      <Button
        text="neutral"
        handleClick={() => setNeutral(neutral + 1)}
      ></Button>
      <Button text="bad" handleClick={() => setBad(bad + 1)}></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
