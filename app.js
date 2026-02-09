const express = require('express');
const dotenv = require('dotenv');

const user_routes = require('./routes/users');
const auth_routes = require('./routes/auth');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

//routes
app.use('/auth', auth_routes);
app.use('/users', user_routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
