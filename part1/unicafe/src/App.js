import React, { useState } from "react";

const Header = () => {
  return <h2>Give Feedback</h2>;
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + bad * -1) / total;
  const positives = (good / total) * 100;

  return (
    <div>
      <h2>Statistics</h2>
      <Paragraph text={"good " + good}></Paragraph>
      <Paragraph text={"neutral " + neutral}></Paragraph>
      <Paragraph text={"bad " + bad}></Paragraph>
      <Paragraph text={"all " + total}></Paragraph>
      <Paragraph text={"average " + average}></Paragraph>
      <Paragraph text={"positive " + positives + " %"}></Paragraph>
    </div>
  );
};

const Paragraph = ({ text }) => {
  return <p>{text}</p>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header></Header>
      <Button text="good" handleClick={() => setGood(good + 1)}></Button>
      <Button
        text="neutral"
        handleClick={() => setNeutral(neutral + 1)}
      ></Button>
      <Button text="bad" handleClick={() => setBad(bad + 1)}></Button>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </div>
  );
};

export default App;
