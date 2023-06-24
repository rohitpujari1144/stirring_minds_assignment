const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const dbUrl = 'mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(dbUrl)
const port = 4500

// getting All Users information
app.get('/', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Stirring_Minds')
        let users = await db.collection('All_Users').find().toArray()
        res.status(200).send(users)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// user signup
app.post('/signup', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Stirring_Minds')
        let user = await db.collection('All_Users').findOne({ email: req.body.email })
        if (!user) {
            await db.collection('All_Users').insertOne(req.body)
            res.status(201).send({ message: 'Signup Successful', data: req.body })
        }
        else {
            res.send({ message: 'Email Id already exist' })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// user login via email
app.get('/login', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('Stirring_Minds')
        let user = await db.collection('All_Users').aggregate([{$match:{email: req.query.email, password: req.query.password}}]).toArray()
        if (user.length!==0) {
            res.status(200).send({ message: 'Login Successful', data: user })
        }
        else {
            res.send({ message: "Invalid Credentials" })
        }
    }
    catch (error) {
        console.log(error);
        res.send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

app.listen(port, () => { console.log(`App listening on ${port}`) })