'use strict';

import customFetch from '../utils/fetch.js';
import parseRuleBook from '../utils/parser.js';
import groupAllRules from '../utils/group.js';
import matchedRules from '../utils/serachAlgo.js';

const fetchUrl =
  'https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt';

const getAllRules = async () => {
  try {
    const text = await customFetch(fetchUrl);
    const arrayOfRules = parseRuleBook(text);
    const group = groupAllRules(arrayOfRules);
    return group;
  } catch (err) {
    console.log('Error get all rules:-', err);
  }
};

const serachRules = async (query) => {
  try {
    const rules = await getAllRules();
    const searchedRules = matchedRules(rules, query);
    return searchedRules.length ? searchedRules : 'No result found';
  } catch (err) {
    console.log('Error search rules:-', err);
  }
};

export { getAllRules, serachRules };
