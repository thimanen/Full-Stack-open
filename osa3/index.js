require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('body', getBody = (request, response) => {
  if (request.method === 'POST') 
    return (JSON.stringify(request.body))
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const Person = require('./models/person')
const { connection } = require('mongoose')
  
  app.get('/info', (request, response) => {
    const numberOfEntries = persons.length
    const timeStamp = new Date().toLocaleString()
    const htmlString = `<p>Phonebook has info for ${numberOfEntries} people</p> ${timeStamp}`
    response.send(htmlString)
  })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if(person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.log('error in DELETE')
      response.status(400).send({error: 'delete did not work'})
    })
})

  

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name can not be empty'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number can not be empty'
    })
  }

    /*
    if (persons.find(entry => entry.name === person.name)) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
    */

    /* person.id = generateId() */

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then((newPerson) => {
      response.json(newPerson)
    })
})

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
