'use strict';

const groupByChapter = (array) => {
  const segments = array.reduce((result, currentObj) => {
    const segmentNo = currentObj.number[0]; // get first letter of number of current element

    if (!result[segmentNo]) result[segmentNo] = { number: currentObj.number,segment:currentObj.chapter, child: [] };   // if there is no property in accumulator with this letter create it

    else result[segmentNo].child.push(currentObj); // if there is, push current element to children array
  
    return result;  }, {});

  return Object.entries(segments).map(([key, value]) => value); // loop through nested objects and return array of values only
};

const groupByRules = (array) => {
  const chapters = array.reduce((result, currentObj) => {
    const chapterNo = parseInt(currentObj.number); 

    if (!result[chapterNo]) result[chapterNo] = { number: currentObj.number,chapter:currentObj.rule, child: [] };   // if there is no property in accumulator with this letter create it

    else result[chapterNo].child.push(currentObj); // if there is, push current element to children array

    return result;

  }, {});

  return groupByChapter(
    Object.entries(chapters).map(([key, value]) => value)
  );
};

const groupAllRules = (array) => {
  const rules = array.reduce((result, currentObj) => {
    const ruleNo= currentObj.number.slice(0,-1);

    if (!result[ruleNo]) result[ruleNo] = { ...currentObj, child: [] };   // if there is no property in accumulator with this letter create it

    else result[ruleNo].child.push({ number:currentObj.number,subrule:currentObj.rule, ...(currentObj.examples ? {examples: currentObj.examples  }:{})}); // if there is, push current element to children array

    return result;
  }, {});
  return groupByRules(Object.entries(rules).map(([key, value]) => value));
};

export default groupAllRules;
