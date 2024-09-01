const mongoose = require('mongoose')

if(process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = 
`mongodb+srv://thimanen:${password}@fullstack-course.iaaje.mongodb.net/?
retryWrites=true&w=majority&appName=FullStack-course`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is easy',
    important: true,
})

note.save().then(result => {
    console.log('note saved')
    mongoose.connection.close()
})
