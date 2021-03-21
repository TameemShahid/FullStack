const express = require("express");

const app = express();
app.use(express.json());

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

/* ALL THE ROUTES */

// Default route
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// GET_ALL_PERSONS ROUTE
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// INFO ROUTE
app.get("/info", (request, response) => {
  const date = new Date().toUTCString();
  const reply = `<div>
      <p>
        Phonebook has info for ${persons.length} people <br />
        ${date}
      </p>
    </div>`;
  response.send(reply);
});

// Specific Person Route
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  console.log(person);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
