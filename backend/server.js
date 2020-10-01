const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000;

const app = express()

app.use(bodyParser.json());
app.use(express.static( 'public' ));


if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://127.0.0.1:5500', // Change origin to your enviroment
        credentials: true
    };
    app.use(cors(corsOptions));
}

const todosRoute = require('./api/todos/todo.route')
const categoryRoute = require('./api/category/category.route')

app.use('/api/todos', todosRoute)
app.use('/api/category', categoryRoute)



app.listen(port,
    () => console.log(`Leverate Todos listening on port ${port}!`))