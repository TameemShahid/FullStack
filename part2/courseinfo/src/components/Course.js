import React from "react";

const Header = ({ course }) => {
  return <h3>{course.name}</h3>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((starting_value, part) => {
    return starting_value + part.exercises;
  }, 0);

  return <h4>Total of {sum} exercises</h4>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((x) => {
        return <Part key={x.id} part={x}></Part>;
      })}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </div>
  );
};

export default Course;
