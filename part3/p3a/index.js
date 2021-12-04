const express = require('express')
const cors = require('cors')

const morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token('body', (req, res)=> JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = 
[
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info',(request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length}</p>
  <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id===id)

  if(person){
    response.json(person)
  } else {
    response.status(404).end();
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !==id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random()*10 +10)
  const body = request.body
  console.log(body)
  People = 
    {
      id,
      name : body.name,
      number : body.number
    }

    if(persons.some(p => People.name === p.name))
      return response.status(400).json({error: 'name must be unique'})

    if(!body.name || !body.number){
      return response.status(404).json({error: 'name or number missing'}).end()
    } 
    
    response.json(People)
    persons = persons.concat(People)
    
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)