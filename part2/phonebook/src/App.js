import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

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
      <Filter search={search} handleSearch={handleSearch}></Filter>
      <h3>Add a new</h3>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      ></PersonForm>
      <h2>Numbers</h2>
      {search === ""
        ? persons.map((person) => (
            <Person key={person.name} person={person}></Person>
          ))
        : searchResult.map((result) => (
            <Person key={result.name} person={result}></Person>
          ))}
    </div>
  );
};

export default App;
