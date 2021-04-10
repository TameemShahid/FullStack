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
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

// INFO ROUTE
app.get("/info", (request, response) => {
  const date = new Date().toUTCString();
  const reply = `<div>
      <p>
        Phonebook has info for ${Person.length} people <br />
        ${date}
      </p>
    </div>`;
  response.send(reply);
});

// Specific Person Route
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

// DELETE Route for a person
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// CREATE NEW PERSON ROUTE
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    response.status(400).json({
      error: "Content Missing",
    });
  } else {
    const person = new Person({
      name: body.name,
      number: body.number,
    });
    person
      .save()
      .then((savedPerson) => {
        response.json(savedPerson);
      })
      .catch((error) => next(error));
  }
});

/* ERROR HANDLING MIDDLEWARE */
const unknownEndpoint = (request, response) => {
  response.status(400).json({ error: "Unknown Endpoint!" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "Malformatted ID!" });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
