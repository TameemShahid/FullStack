import React from "react";

const Person = ({ person, handleClick }) => {
  return (
    <li style={{ listStyle: "none" }}>
      {person.name} {person.number}{" "}
      <button onClick={() => handleClick(person.id, person.name)}>
        Delete
      </button>
    </li>
  );
};

export default Person;
