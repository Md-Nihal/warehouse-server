/*
https://github.com/ProgrammingHeroWC4/warehouse-management-server-side-Md-Nihal
*/

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectID } = require('bson');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.spy3w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productsCollection = client.db('supplyChain').collection('products')

        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);

        });

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectID(id) };
            const products = await productsCollection.findOne(query);
            res.send(products);
        })

    }
    catch {

    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running the server')
})

app.listen(port, () => {
    console.log('listening from', port)
})