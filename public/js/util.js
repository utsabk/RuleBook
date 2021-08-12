'use strict';

const slideToggle = (target) => {
  if (!target.classList.contains('active')) {
    target.classList.add('active');
    target.style.height = 'auto';

    const height = target.clientHeight + 'px';

    target.style.height = '0px';

    setTimeout(() => {
      target.style.height = height;
    }, 0);
  } else {
    target.style.height = '0px';

    target.addEventListener(
      'transitionend',
      () => {
        target.classList.remove('active');
      },
      {
        once: true,
      }
    );
  }
};

const htmlToElement = (html) => {
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};


export {slideToggle, htmlToElement }

// Recursive function to populate rules/subrules in a list
    // const listRules = (rules,parentElement) => {
    //     const ruleUL = document.createElement('ul'); // Rule container
    //     ruleUL.className = 'ruleUL';
        
    //     return rules.map((rule) => {  
    //         const [ruleNumber, ruleContent] = Object.keys(rule); // Access first and second property of object
    //         const ruleListItem = listItemWithLink(rule[ruleNumber], rule[ruleContent]);
    //         ruleListItem.className = 'ruleLI'
    //         ruleUL.appendChild(ruleListItem);
    //         parentElement.appendChild(ruleUL);

    //         ruleListItem.children[1].addEventListener('click', (event) => {
    //             event.preventDefault();
    //             slideToggle(ruleListItem.children[2]);
    //         });

    //         if (rule.examples && rule.examples.length)
    //         rule.examples.map((ex) =>
    //         ruleListItem.appendChild(listItemWitExample(ex))
    //         );
    //         if (rule.child && rule.child.length) listRules(rule.child,ruleListItem);
    //     })
    // }



