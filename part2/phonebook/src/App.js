import React, { useEffect, useState } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  const personToShow =
    newFilter.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  useEffect(() => {
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const msg = `${newName} is already added to phonebook, replace the old number with a new one?`;
    const duplicatePerson = persons.find((p) => p.name === newName);

    if (duplicatePerson) {
      personService
        .update(duplicatePerson.id, newPerson)
        .then((returnedPerson) => {
          setNotificationMessage({
            text: `Updated ${returnedPerson.name}`,
            type: "notification",
          });

          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);

          setPersons(
            persons.map((p) =>
              p.id !== duplicatePerson.id ? p : returnedPerson
            )
          );
        });
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setNotificationMessage({
          text: `Added ${returnedPerson.name}`,
          type: "notification",
        });

        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);

        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const destroyContact = (e) => {
    const id = Number(e.target.id);
    const name = e.target.name;
    const msg = `Do you really want to delete ${name}?`;

    if (window.confirm(msg) === true) {
      personService
        .destroy(id)
        .then((destroyedPerson) => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setNotificationMessage({
            text: `The person, ${name} was already removed from server`,
            type: "error",
          });

          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);

          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  const handleNameChange = (event) => {
    const input = event.target.value;
    setNewName(input);
  };
  const handleNumberChange = (event) => {
    const input = event.target.value;
    setNewNumber(input);
  };

  const handleFilter = (event) => {
    const input = event.target.value;
    setNewFilter(input);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notificationMessage !== null ? (
        <Notification message={notificationMessage} />
      ) : null}
      <Filter value={newFilter} onChange={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        addContact={(e) => addContact(e)}
        handleNameChange={(e) => handleNameChange(e)}
        handleNumberChange={(e) => handleNumberChange(e)}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personToShow}
        destroyContact={(e) => destroyContact(e)}
      />
    </div>
  );
};

export default App;
