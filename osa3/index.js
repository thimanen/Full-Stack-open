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

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary poppendieck",
        number: "39-23-6423122" 
    },
    {
      id: "5",
      name: "Teemu Teekkari",
      number: "12-34-56-78-90" 
    }
  ]
  
  app.get('/info', (request, response) => {
    const numberOfEntries = persons.length
    const timeStamp = new Date().toLocaleString()
    const htmlString = `<p>Phonebook has info for ${numberOfEntries} people</p> ${timeStamp}`
    response.send(htmlString)
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
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
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

  const generateId = () => {
    return String(Math.floor(Math.random() * 1000))
  }

  app.post('/api/persons', (request, response) => {
    const person = request.body

    if (!person.name) {
      return response.status(400).json({
        error: 'name can not be empty'
      })
    }

    if (!person.number) {
      return response.status(400).json({
        error: 'number can not be empty'
      })
    }

    if (persons.find(entry => entry.name === person.name)) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    person.id = generateId()
    persons = persons.concat(person)
    response.json(person)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
