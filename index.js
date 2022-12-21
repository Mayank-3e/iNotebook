const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 7000

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>
{
    res.send("Main frontend!")
})

app.listen(port, () => {
console.log(`frontend listening on port ${port}`)
})

// Export the Express API
module.exports = app;