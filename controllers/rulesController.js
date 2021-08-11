'use strict';
import customFetch from '../utils/fetch.js';
import parseRuleBook from '../utils/parser.js';
import groupAllRules from '../utils/group.js';

const fetchUrl =
  'https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt';


const getRules = async (req, res) => {

  const response = await customFetch(fetchUrl);

  const arrayOfRules = parseRuleBook(response);

  const group = groupAllRules(arrayOfRules);

  res.json(group);
};

export default getRules;