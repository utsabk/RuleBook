'use strict';
import * as model from '../models/rules.js';

const getRules = async (req, res) => {
  const query = req.query.query;
  try {
    const rules = await model.getAllRules();

    if (query) {
      const search = await model.serachRules(query);

      return search ? res.json(search) : res.send('No search found');
    }
    res.json(rules);
  } catch (err) {
    console.error(err);
  }
};

export default getRules;
