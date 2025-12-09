require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT;

// enable CORS
app.use(cors());

app.use(express.static('dist'));

// parse JSON bodies
app.use(express.json());

// custom morgan token for request body
morgan.token('body', (req) => JSON.stringify(req.body));

// request logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (!body || !body.name || !body.number) {
    return res.status(400).json({ error: 'name and number are required' });
  }

  const person = new Person({ name: body.name, number: body.number });
  person.save()
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      const now = new Date();
      const html = `
        <div>
          <p>Phonebook has info for ${count} people</p>
          <p>${now}</p>
        </div>
      `;
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    })
    .catch((err) => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }
      res.json(person);
    })
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'name and number are required' });
  }

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return res.status(404).end();
      }
      res.status(200).json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      next(err);
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, Hello`);
});
