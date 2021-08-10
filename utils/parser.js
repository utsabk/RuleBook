'use strict';

const parseRulesToObj = (line) => {
  const trimmedLine = line.trim().replace(/\r?\n|\r/g, '');

  const regex = /^(\d)/;

  const numStart = regex.exec(trimmedLine); // Search a line starts with a number"

  if (numStart) {
    let [number, ...rule] = numStart.input.split(' '); // first word from a line is rule number
    rule = rule.join(' ');
    rule = rule.split(/Example:/); // break down a rule if contains any "Example:"

    const [myRule, ...examples] = rule;

    return {
      number: number,
      rule: myRule,
      ...(examples.length ? { examples: examples } : {}), // Only if examples exists property "examples" is added
    };
  }
};

const parseRuleBook = (book) => {
  const lines = book.split(/\r?\n(?!Example:)/); // Break at line break except when followed by word "Example:"

  const rules = lines.map((rule) => parseRulesToObj(rule)).filter((rule) => rule); // remove empty , null , undefined values from an array.

  return rules.filter(
    (rule, index, array) =>
      index === array.findIndex((item) => item.number === rule.number) // remove objects with duplicate property (number)
  );
};

export default parseRuleBook;
