var mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide password to the database: node mongo.js <password>"
  );
  process.exit(1);
}

password = process.argv[2];
const url = `mongodb+srv://Tameem:${password}@cluster0.54zwv.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const personName = process.argv[3];
  const personNumber = process.argv[4];
  const person = new Person({
    name: personName,
    number: personNumber,
  });

  person.save().then((response) => {
    console.log(`Added ${personName} with number ${personNumber} to phonebook`);
    mongoose.connection.close();
  });
}
