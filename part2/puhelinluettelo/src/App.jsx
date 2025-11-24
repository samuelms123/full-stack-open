import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = newName.trim()
    const number = newNumber.trim()
    if (!name) return

    if (persons.some((p) => p.name === name)) {
      alert(`${name} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({ name, number }))
    setNewName('')
    setNewNumber('')
  }

  const shownPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.trim().toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={shownPersons} />
    </div>
  )
}

export default App
