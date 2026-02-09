const express = require('express');
const dotenv = require('dotenv');

const user_routes = require('./routes/users');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

//routes
app.use('/users', user_routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
