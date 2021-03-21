import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(persons);
  const [successMessage, setSuccessMessage] = useState(null);

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
    const person = persons.find((person) => person.name === newName);
    if (person) {
      console.log(person);
      person.number = newNumber;
      console.log(person);
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (result) {
        personsService.update(person).then((modifiedPerson) => {
          setPersons(
            persons.map((p) => (p.id === person.id ? modifiedPerson : p))
          );
          setNewName("");
          setNewNumber("");
          setSuccessMessage(
            `Modified ${modifiedPerson.name} number to ${modifiedPerson.number}`
          );
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personsService.create(newPerson).then((newCreatedPerson) => {
        setPersons(persons.concat(newCreatedPerson));
        setNewName("");
        setNewNumber("");
        setSearchResult(persons);
        setSuccessMessage(`Added ${newCreatedPerson.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
    }
  };

  const handleDelete = (id, name) => {
    const result = window.confirm(`Delete ${name}`);
    if (result) {
      personsService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}></Notification>
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
            <Person
              key={person.name}
              person={person}
              handleClick={handleDelete}
            ></Person>
          ))
        : searchResult.map((result) => (
            <Person
              key={result.name}
              person={result}
              handleClick={handleDelete}
            ></Person>
          ))}
    </div>
  );
};

export default App;
