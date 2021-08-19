const express = require('express')
const cors = require('cors')
// const fs = require('fs');

const reportsRouter = require('./routers/report')

const app = express();
app.use(cors());

const port = process.env.PORT || 3000
app.use(express.json())
app.use(reportsRouter)

const server = app.listen(port, ()=>{
    const host = server.address().address
    const port = server.address().port
    console.log('server is up and listening on http://%s:%s ', host, port)
})