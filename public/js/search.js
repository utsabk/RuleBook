'use strict';
import customFetch from './fetch.js';
import { listItemWithoutLink } from './util.js';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const rulesContainer = document.querySelector('.rules');

const createList = (number, rule, parentElement) => {
  const ruleListItem = listItemWithoutLink(number, rule);
  ruleListItem.className = 'rule';
  ruleListItem.style.display = 'block';
  return parentElement.appendChild(ruleListItem);
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

    const ul = document.querySelector('.search-rules');

    if (ul) ul.remove();

    const ruleUL = document.createElement('ul'); // Rules ul
    ruleUL.className = 'search-rules';

    document
      .querySelectorAll('.rule')
      .forEach((rule) => (rule.style.display = 'none')); // Hide all the rules

    if (typeof response === 'object') {
      //Only if
      response.map((rule) => {
        const [firstProp, secondProp] = Object.keys(rule); // Access first and second property of object
        
        const rulesList = createList(rule[firstProp],rule[secondProp],ruleUL)
        const ruleListItem = listItemWithoutLink(
          rule[firstProp],
          rule[secondProp]
        );
        ruleListItem.className = 'rule';
        ruleListItem.style.display = 'block';
        ruleUL.appendChild(ruleListItem);
        rulesContainer.appendChild(ruleUL);
      });
    } else {
      const ruleListItem = listItemWithoutLink('Oops!', response);
      ruleListItem.className = 'rule';
      ruleListItem.style.display = 'block';
      ruleUL.appendChild(ruleListItem);
      rulesContainer.appendChild(ruleUL);
    }
  }
});
