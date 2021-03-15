import React, { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Anecdote = ({ text, value }) => {
  return (
    <p>
      {text}
      <br />
      has {value} votes
    </p>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelcted] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(0);

  const handleVote = (selected) => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);

    if (points[mostVoted] <= copy[selected]) {
      setMostVoted(selected);
    }
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} value={points[selected]}></Anecdote>
      <Button text="vote" handleClick={() => handleVote(selected)}></Button>
      <Button
        text="next anecdote"
        handleClick={() => setSelcted((selected + 1) % anecdotes.length)}
      ></Button>
      <h2>Anecdote with most votes</h2>
      <Anecdote
        text={anecdotes[mostVoted]}
        value={points[mostVoted]}
      ></Anecdote>
    </div>
  );
};

export default App;
