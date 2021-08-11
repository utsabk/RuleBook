'use strict';
import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import rulesRoute from './routes/rulesRoute.js';

const app = express();

app.use(cors()); // To allow resources from different sources/outside domains

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/rules', rulesRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log('listening on port:', process.env.PORT);
});
