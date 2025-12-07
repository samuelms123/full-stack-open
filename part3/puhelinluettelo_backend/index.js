const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// enable CORS
app.use(cors());

app.use(express.static('dist'))

// parse JSON bodies
app.use(express.json());

// custom morgan token for request body
morgan.token('body', (req) => JSON.stringify(req.body));

// request logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-64231222222',
  },
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body || !body.name || !body.number) {
    return res.status(400).json({ error: 'name and number are required' });
  }

  // check for duplicate name
  const existing = persons.find((p) => p.name === body.name);
  if (existing) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const id = String(Math.floor(Math.random() * 1000000) + 1);
  const newPerson = {
    id,
    name: body.name,
    number: body.number,
  };

  persons.push(newPerson);

  res.status(201).json(newPerson);
});

app.get('/info', (req, res) => {
  const count = persons.length;
  const now = new Date();
  const html = `
    <div>
      <p>Phonebook has info for ${count} people</p>
      <p>${now}</p>
    </div>
  `;
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const index = persons.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).end();
  }
  persons.splice(index, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, Hello`);
});
