require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errHandler = require('./middlewares/errHandler');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require('./routes');
app.use(router);
app.use(errHandler);

app.listen(port, () => {
  console.log(`Tralala! is listening at http://localhost:${port}`);
});
