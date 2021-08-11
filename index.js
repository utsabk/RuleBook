'use strict';
import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import customFetch from './utils/fetch.js';
import parseRuleBook from './utils/parser.js';
import groupAllRules from './utils/group.js';



const app = express();

app.use(cors()); // To allow resources from different sources/outside domains

const fetchUrl =
  'https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt';



app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async (req, res) => {

  const response = await customFetch(fetchUrl);
  
  const arrayOfRules = parseRuleBook(response);

  const group = groupAllRules(arrayOfRules);

  res.json(group);
});

app.listen(process.env.PORT || 8000, () => {
  console.log('listening on port:', process.env.PORT);
});
