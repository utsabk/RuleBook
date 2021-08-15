'use strict';

const matchedRules = (rules, query) => {
  const matchedRules = [];

  const serachThrough = (rules, query) => {
    return rules.map((rule) => {
      const [firstProp, secondProp] = Object.keys(rule); // Access first and second property of object
      const regex = new RegExp(`\\b${query}\\b`, 'g');
      if (regex.test(rule[secondProp])) {
          const replceWith = `<strong style="color:#FF0000";>${query}</strong>`//Highlight the searched item
          const ruleContent = rule[secondProp].replace(regex,replceWith)
        matchedRules.push({
          number: rule.number,
          [secondProp]: ruleContent,
        });
      }
      if (rule.child && rule.child.length)
        return serachThrough(rule.child, query);
    });
  };

  serachThrough(rules, query);
  return matchedRules;
};

export default matchedRules;
