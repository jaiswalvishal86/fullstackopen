import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const MainAnecdote = ({ votes, anecdotes, selected }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{selected}</p>
      <p>Has {votes[anecdotes.indexOf(selected)]} votes</p>
    </div>
  );
};

const AnecdotesWithMostVotes = ({ votes, anecdotes }) => {
  const topVotedAnecdoteScore = Math.max(...votes);
  const topVotedAnecdoteIndex = votes.indexOf(
    topVotedAnecdoteScore
  );
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[topVotedAnecdoteIndex]}</p>
      <p>Has {topVotedAnecdoteScore} votes.</p>
    </div>
  );
};

const App = () => {
  const [selected, setSelected] = useState(anecdotes[0]);
  const [votes, setVotes] = useState(
    Array(anecdotes.length).fill(0)
  );

  const updateVotes = () => {
    const score = [...votes];
    score[anecdotes.indexOf(selected)] += 1;
    return setVotes(score);
  };

  const getNextAnecdote = () => {
    return setSelected(
      anecdotes[
        Math.floor(Math.random() * anecdotes.length)
      ]
    );
  };

  return (
    <div>
      <MainAnecdote
        votes={votes}
        anecdotes={anecdotes}
        selected={selected}
      />
      <Button onClick={updateVotes} text="vote" />
      <Button
        onClick={getNextAnecdote}
        text="next anecdote"
      />
      <AnecdotesWithMostVotes
        votes={votes}
        anecdotes={anecdotes}
      />
    </div>
  );
};

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById("root")
);
