require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

var createAndSavePerson = function (done) {
  var janeFonda = new Person({
    name: "Belay Birhanu",
    age: 84,
    favoriteFoods: ["Enjera", "Bread", "Fruit"],
  });

  janeFonda.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "Genfo";
  Person.findById(personId, function (err, person) {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save(function (err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    },
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Abebe";
  Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "Enjera";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
