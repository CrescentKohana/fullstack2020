const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
mongoose.connect(
  `mongodb+srv://fullstack:${password}@cluster0.hh1hn.mongodb.net/phonebook-app?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => { console.log(`${person.name} : ${person.number}`) })
    mongoose.connection.close()
  })
} else if (process.argv.length === 4) {
  console.log('Please provide both, a name and a number as arguments: node mongo.js <password> <name> <number>')
  process.exit(1)
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(() => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
}
