'use strict';
import customFetch from './fetch.js';
import { listItemWithoutLink } from './util.js';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const rulesContainer = document.querySelector('.rules');

const createList = (number, rule) => {
  const ruleListItem = listItemWithoutLink(number, rule);
  ruleListItem.className = 'rule';
  ruleListItem.style.display = 'block';
  return ruleListItem;
};

searchButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const query = searchInput.value;

  if (query) {
    const response = await customFetch(
      `./rules/?query=${query}`,
      requestOptions
    );
    console.log('response', response);
    const ul = document.querySelector('.search-rules');

    if (ul) ul.remove();

    const ruleUL = document.createElement('ul'); // Rules ul
    ruleUL.className = 'search-rules';

    document
      .querySelectorAll('.rule')
      .forEach((rule) => (rule.style.display = 'none')); // Hide all the rules

    if (typeof response === 'object') {
      response.map((rule) => {
        const [firstProp, secondProp] = Object.keys(rule); // Access first and second property of object

        const rulesList = createList(rule[firstProp], rule[secondProp]);

        ruleUL.appendChild(rulesList);
        rulesContainer.appendChild(ruleUL);
      });
    } else {
      const rulesList = createList('Oops!', response);

      ruleUL.appendChild(rulesList);
      rulesContainer.appendChild(ruleUL);
    }
  }
});
