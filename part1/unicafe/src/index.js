import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, state }) => (
  <tr>
    <td>
      {text} {state}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  const average = () => (good - bad) / all;
  const positive = () => (good / all) * 100 + " %";

  if (all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" state={good} />
        <Statistic text="neutral" state={neutral} />
        <Statistic text="bad" state={bad} />
        <Statistic text="all" state={all} />
        <Statistic text="average" state={average()} />
        <Statistic text="positive" state={positive()} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Heading text="give feedback" />
      <Button
        text="good"
        handleClick={() => setGood(good + 1)}
      />
      <Button
        text="neutral"
        handleClick={() => setNeutral(neutral + 1)}
      />
      <Button
        text="bad"
        handleClick={() => setBad(bad + 1)}
      />
      <Heading text="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
