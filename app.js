const mongoose = require('mongoose')
const express = require('express')
require('dotenv/config')
app = express();

const allRouter=require('./Routes/index')
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use(allRouter)

mongoose.connect(process.env.DB_SERVER, (req, res) => {
    console.log('DataBase Connect')
})

app.listen(3000, () => {
    console.log('port connect')
})