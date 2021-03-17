import React, { useState } from "react";

const Name = ({ person }) => {
  return (
    <li style={{ listStyle: "none" }}>
      {person.name} {person.number}
    </li>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(persons);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      console.log("Not empty");
      const temp = persons.filter((person) => {
        return person.name
          .toUpperCase()
          .includes(event.target.value.toUpperCase());
      });
      setSearchResult(temp);
      console.log(temp);
    } else {
      setSearchResult(persons);
      console.log(searchResult);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
      setSearchResult(persons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input type="text" value={search} onChange={handleSearch} />
      </div>
      <form onSubmit={addNewPerson}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {search === ""
        ? persons.map((person) => <Name person={person}></Name>)
        : searchResult.map((result) => <Name person={result}></Name>)}
    </div>
  );
};

export default App;
