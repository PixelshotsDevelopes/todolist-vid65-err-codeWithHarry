const express = require('express')
const connectToMongo = require('./db');
const cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

//middleware
app.use(cors())
app.use(express.json());

//Available routes
app.use('/api/auth' ,  require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})