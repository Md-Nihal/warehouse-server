const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res)=>{
    res.send('running the server')
})

app.listen(port, ()=>{
    console.log('listening from', port)
})