require('dotenv').config()
const express = require('express')
const app = express()
app.listen(process.env.PORT)
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const cors = require('cors')
const loginroutes = require('./routes/login')
const checklistroutes = require('./routes/checklist')
const path = require('path')
app.use(cors())
app.use(express.json())
app.use(
  express.static(path.join(__dirname, '../dist/project8/'))
)
app.use(loginroutes)
app.use(checklistroutes)

app.get(
  '/*',
  (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/project8/index.html'))
  }
)

app.use((req, res) => {
  res.json(
    {
      status: 0,
      msg: '404 error'
    }
  )
})
