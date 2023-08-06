
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

let PORT = process.env.PORT || 6000
app.use(express.json())



async function letConnect() {
    return await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.6sujrau.mongodb.net/?retryWrites=true&w=majority`)
}
letConnect()
    .then((d) => {
        console.log('connect')
        app.post('/api/save_friends', (req, res) => {
            console.log(req.body.name)
            const FriendsColl = mongoose.model('Friends', { name: 'String' })
            const Friends = new FriendsColl({ name: req.body.name })
            Friends.save().then(() => {
                console.log('saved data ')
            });
            res.status(201).json({
                msg: "okk"
            })

        })

    })
    .catch((err) => {
        console.log('error', err)
    })
    .finally()




app.listen(PORT, () => {
    console.log(`this serveris running port ${PORT}`)
})