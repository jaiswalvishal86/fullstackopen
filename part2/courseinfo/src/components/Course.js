import React from "react";

const Header = ({ name }) => <h2>{name}</h2>;

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  const partElement = parts.map((part) => (
    <Part key={part.id} part={part} />
  ));
  return <div>{partElement}</div>;
};

const Total = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, currentValue) => {
      return {
        exercises:
          accumulator.exercises + currentValue.exercises,
      };
    }
  );

  return <h4>total of {total.exercises} exercises</h4>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
