const express = require('express')

//start express
const app = express()

//confing express to parse json
app.use(express.json())

//port swich for prod and dev
const port = process.env.PORT || 3000

//listens for port (3000 for dev)
app.listen(port,() => {
    console.log(`Runing on port ${port}`)
})