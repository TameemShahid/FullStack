import React, { useState } from "react";

const Name = ({ person }) => {
  return <li style={{ listStyle: "none" }}>{person.name}</li>;
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
    { name: "Ada Lovelace" },
  ]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
    } else {
      const newPerson = { name: newName };
      setPersons(persons.concat(newPerson));
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <Name key={person.name} person={person}></Name>;
      })}
    </div>
  );
};

export default App;
