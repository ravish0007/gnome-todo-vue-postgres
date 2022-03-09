const express = require('express')
const cors = require('cors')

const router = require('./routes')
const config = require('./config')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/todos', router.todoRoute)

const PORT = process.env.SERVER_PORT || 3001
app.listen(PORT, () => { console.log(`Server running.. on ${PORT}`) })
