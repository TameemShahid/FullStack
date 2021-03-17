import React from "react";

const Person = ({ person }) => {
  return (
    <li style={{ listStyle: "none" }}>
      {person.name} {person.number}
    </li>
  );
};

export default Person;
