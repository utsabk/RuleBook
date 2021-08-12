'use strict';
import customFetch from './fetch.js';
import {slideToggle, htmlToElement } from './util.js'



const listItemWithLink = (number, title) =>
  htmlToElement(`<li><b>${number}</b><a href=#${title}>${title}</a></li>`);

const listItemWithoutLink = (number, title) =>
  htmlToElement(`<li><b>${number}</b>${title}</li>`);

const listItemWitExample = (example) =>
  htmlToElement(`<p class'example'><i><b>Example:</b>${example}</i></p>`);

const createList = (array, parentElement) => {
    return array.map((segment) => {
        const segmentListItem = listItemWithLink(segment.number, segment.segment);
        segmentListItem.className = 'segment';

        parentElement.appendChild(segmentListItem);

        const ul = document.createElement('ul'); // Chapters container

        if (segment.child && segment.child.length) {
            return segment.child.map((chapter) => {
                const chapterListItem = listItemWithLink(chapter.number, chapter.chapter);
                chapterListItem.className += 'chapter';
                ul.appendChild(chapterListItem);
                segmentListItem.appendChild(ul);

                chapterListItem.children[1].addEventListener('click', (event) => {
                event.preventDefault();
                slideToggle(chapterListItem.children[2]);
                });

                const ruleUL = document.createElement('ul'); // Rule container
                ruleUL.className = 'ruleUL';

                chapter.child.map((rule) => {
                const ruleListItem = listItemWithoutLink(rule.number, rule.rule);
                ruleListItem.className = 'rule';
                ruleUL.appendChild(ruleListItem);
                chapterListItem.appendChild(ruleUL);
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
  
    const topUL = document.querySelector('.toc'); // Segments container
  
    createList(rules, topUL);
};
  
populateRules();
  