'use strict';
import customFetch from './fetch.js';
import { listItemWithLink, listItemWithoutLink, listItemWitExample } from './util.js'


const createList = (array, parentElement) => {
    return array.map((segment) => {
        const segmentListItem = listItemWithoutLink(segment.number, segment.segment);
        segmentListItem.className = 'segment';

        parentElement.appendChild(segmentListItem);

        const ul = document.createElement('ul'); // Chapters container

        if (segment.child && segment.child.length) {
            return segment.child.map((chapter) => {
                const chapterListItem = listItemWithLink(chapter.number, chapter.chapter);
                chapterListItem.className += 'chapter';
                ul.appendChild(chapterListItem);
                segmentListItem.appendChild(ul);

                const rightScreen = document.querySelector('.rules');

                //Click event listner 
                chapterListItem.children[1].addEventListener('click', (event) => {
                event.preventDefault();
                const [ul] = document.getElementsByClassName(chapter.number);
                document.querySelectorAll('.rule').forEach(rule => rule.style.display = 'none')
                ul.querySelectorAll('.rule').forEach(rule => rule.style.display = 'block')
                });

                const ruleUL = document.createElement('ul'); // Rule container
                ruleUL.className = chapter.number;


                chapter.child.map((rule) => {
                const ruleListItem = listItemWithoutLink(rule.number, rule.rule);
                ruleListItem.className = 'rule';
                ruleUL.appendChild(ruleListItem);
                rightScreen.appendChild(ruleUL);
                if (rule.examples && rule.examples.length)
                    rule.examples.map((ex) => ruleListItem.appendChild(listItemWitExample(ex)));

                const subRuleUL = document.createElement('ul'); // Subule container
                rule.child.map((subrule) => {
                    const subruleListItem = listItemWithoutLink(subrule.number, subrule.subrule);
                    subruleListItem.className = 'subrule';
                    subRuleUL.appendChild(subruleListItem);
                    ruleListItem.appendChild(subRuleUL);
                    if (subrule.examples && subrule.examples.length)
                    subrule.examples.map((ex) =>
                    subruleListItem.appendChild(listItemWitExample(ex))
                    );
                });
                });
            });
        }

        return segment;
    });
};

const populateRules = async () => {
    const rules = await customFetch('./rules/');
  
    const topUL = document.querySelector('.list-head'); // Segments container
  
    createList(rules, topUL);
};
  
populateRules();
  