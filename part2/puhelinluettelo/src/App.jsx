import { useState, useEffect } from 'react';
import personService from './services/personService';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = newName.trim();
    const number = newNumber.trim();
    if (!name) return;

    const existing = persons.find((p) => p.name === name);
    if (existing) {
      if (
        window.confirm(
          `${existing.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existing, number };
        try {
          const returnedPerson = await personService.updatePersonNumber(
            existing.id,
            updatedPerson
          );
          setPersons((prev) =>
            prev.map((p) => (p.id !== existing.id ? p : returnedPerson))
          );
          setNewName('');
          setNewNumber('');
          setNotificationMessage(`Updated ${existing.name}'s number`);
          setNotificationType('success');
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setNotificationMessage(
              `Information of ${existing.name} has already been removed from server`
            );
            setNotificationType('error');
            setPersons((prev) => prev.filter((p) => p.id !== existing.id));
          } else {
            setNotificationMessage(`Failed to update ${existing.name}: ${error.message}`);
            setNotificationType('error');
          }
        }
      }
      return;
    }

    const personObject = { name, number };

    personService.create(personObject).then((returnedPerson) => {
      setPersons((prev) => prev.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      setNotificationMessage(`Added ${returnedPerson.name}`);
      setNotificationType('success');
    });
  };

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const shownPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.trim().toLowerCase())
  );

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete ${p.name} ?`)) return;

    try {
      await personService.deletePerson(p.id);
      setPersons((prev) => prev.filter((person) => person.id !== p.id));
      setNotificationMessage(`Deleted ${p.name}`);
      setNotificationType('success');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNotificationMessage(
          `Information of ${p.name} has already been removed from server`
        );
        setNotificationType('error');
        setPersons((prev) => prev.filter((person) => person.id !== p.id));
      } else {
        setNotificationMessage(`Failed to delete ${p.name}: ${error.message}`);
        setNotificationType('error');
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        type={notificationType}
        onClose={() => {
          setNotificationMessage(null);
          setNotificationType(null);
        }}
      />
      <h2>Country search (basic)</h2>
      <div>
        <Filter filter={filter} setFilter={setFilter} />
        <p>Current filter: {filter}</p>
        <p>Countries loaded: {countries.length}</p>
      </div>
      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={shownPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
