const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/mongo");

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

// DEFINING ALL APP.USE
const app = express();
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());
app.use(express.static("build"));

let persons = [
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
  Person.find({}).then((result) => {
    response.json(result);
  });
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

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// DELETE Route for a person
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

// CREATE NEW PERSON ROUTE
app.post("/api/persons", (request, response) => {
  const body = request.body;
  const check = persons.filter((p) => p.name === body.name);

  if (!body.name || !body.number) {
    response.status(400).json({
      error: "Content Missing",
    });
  } else if (check.length > 0) {
    response.status(400).json({
      error: "The name already exists in the phonebook",
    });
  } else {
    const person = {
      id: Math.round(Math.random() * 10000),
      name: body.name,
      number: body.number,
    };
    persons = persons.concat(person);
    response.json(person);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
