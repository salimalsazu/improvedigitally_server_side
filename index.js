
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

//cors
app.use(cors());
//middleware
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@portfolio.zka99gz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {

    try {
        const blogsCollection = client.db('improveDigitally').collection('blogs');


        //get blogs 
        app.get('/blogs', async (req, res) => {
            const query = {}
            const cursor = await blogsCollection.find(query).toArray();
            res.send(cursor);
        })

        //limit
        app.get('/limitblogs', async (req, res) => {
            const query = {}
            const cursor = blogsCollection.find(query).sort({ current: -1 });
            const blog = await cursor.limit(3).toArray();
            res.send(blog);
        })


        //posting blogs 
        app.post('/blogs', async (req, res) => {
            const blog = req.body;
            const result = await blogsCollection.insertOne(blog);
            res.send(result);
        })


    }
    finally {



    }


}
run().catch((err) => console.error(err))



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})