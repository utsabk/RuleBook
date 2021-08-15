'use strict';

const matchedRules = (rules, query) => {
  const matchedRules = [];

  const serachThrough = (rules, query) => {
    return rules.map((rule) => {
      const [ruleNumber, ruleContent] = Object.keys(rule); // Access first and second property of object
      const regex = new RegExp(`\\b${query}\\b`, 'g');
      if (regex.test(rule[ruleContent])) {
        matchedRules.push({
          number: rule.number,
          [ruleContent]: rule[ruleContent],
        });
      }
      if (rule.child && rule.child.length)
        return serachThrough(rule.child, query);
    });
    //  .filter((rule) => (rule ? JSON.stringify(rule) !== '[]' : rule)); // Remove undefined and enplty arrays
  };

  serachThrough(rules, query);
  return matchedRules;
};

export default matchedRules;
