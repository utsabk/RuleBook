'use strict';
import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import customFetch from './utils/fetch.js';

const app = express();

app.use(cors()); // To allow resources from different sources/outside domains

const fetchUrl =
  'https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt';


app.get('/', async (req, res) => {

  const response = await customFetch(fetchUrl);

  res.json(response);
});

app.listen(process.env.PORT, () => {
  console.log('listening on port:', process.env.PORT);
});
