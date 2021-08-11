'use strict';
const customFetch = async (url) => {
  try {
    const response = await fetch(url);
    const result = response.json();

    return result;
  } catch (err) {
    console.log('Error fetching:-', err);
  }
};

const populateRules = (array) => {
  return array.map((item) => {
    const li = document.createElement('li');

    const a = document.createElement('a');

    const b = document.createElement('b');

    const ruleNumber = document.createTextNode(item.number);

    const rule = document.createTextNode(item.segment);

    a.appendChild(rule);

    b.appendChild(ruleNumber);

    a.href = `#${item.rule}`;
    li.appendChild(b);
    li.appendChild(a);

    return li;
  });
};

const getRules = async () => {
  const rules = await customFetch('./rules/');

  const test = populateRules(rules);

  console.log('thus is test', test);

  const ul = document.querySelector('.toc_segments');

  return test.map((item) => {
    ul.appendChild(item);
  });
};

getRules();
