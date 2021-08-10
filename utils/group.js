'use strict';

const group = (condition, result, currentObj) => {

  if (!result[condition]) result[condition] = { ...currentObj, child: [] };   // if there is no property in accumulator with this letter create it

  else result[condition].child.push(currentObj); // if there is, push current element to children array

  return result;
  // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
};

const groupBySegment = (array) => {
  const object = array.reduce((result, currentObj) => {
    const condition = currentObj.number[0]; // get first letter of number of current element

    return group(condition, result, currentObj);
  }, {});

  return Object.entries(object).map(([key, value]) => value); // loop through nested objects and return array of values only
};

const groupByChapter = (array) => {
  const object = array.reduce((result, currentObj) => {
    const condition = parseInt(currentObj.number); 

    return group(condition, result, currentObj);
  }, {});

  return groupBySegment(
    Object.entries(object).map(([key, value]) => value)
  );
};

const groupAllRules = (array) => {
  const object = array.reduce((result, currentObj) => {
    const [condition, ...rest] = currentObj.number.split(/[a-zA-Z]/);

    return group(condition, result, currentObj);
  }, {});
  return groupByChapter(Object.entries(object).map(([key, value]) => value));
};

export default groupAllRules;
