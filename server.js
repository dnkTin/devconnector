var express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


// db config
const db = require('./config/key').mongoURI;


// connect mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('mongodb connected'))
    .catch((error) => console.log('fail to connect cause: ' + JSON.stringify(error)))

const app = express();

app.get('/', (req, res) => res.send('hello'))

// create an port an run it on heroku
const port = process.env.PORT || 5000;

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => {
    console.log('server running on port:' + port);
})