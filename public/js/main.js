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

const listItemWithLink = (number, title) =>
  htmlToElement(`<li><b>${number}</b><a href=#${title}>${title}</a></li>`);

const listItemWithoutLink = (number, title) =>
  htmlToElement(`<li><b>${number}</b>${title}</li>`);

const listItemWitExample = (example) =>
  htmlToElement(`<p class'example'><i><b>Example:</b>${example}</i></p>`);

const createList = (array) => {
  return array.map((item) => {
    const topUL = document.querySelector('.toc'); // Segments container

    const segment = listItemWithLink(item.number, item.segment);
    segment.className = 'segment';

    topUL.appendChild(segment);

    const ul = document.createElement('ul'); // Chapters container

    if (item.child && item.child.length) {
      return item.child.map((item) => {
        const chapter = listItemWithLink(item.number, item.chapter);
        chapter.className += 'chapter';
        ul.appendChild(chapter);
        segment.appendChild(ul);

        chapter.children[1].addEventListener('click', (event) => {
          event.preventDefault();
          slideToggle(chapter.children[2]);
        });

        const ruleUL = document.createElement('ul'); // Rule container
        const section = document.createElement('section');
        section.className = 'section';

        item.child.map((item) => {
          const rule = listItemWithoutLink(item.number, item.rule);
          rule.className = 'rule';
          section.appendChild(ruleUL);
          ruleUL.appendChild(rule);
          chapter.appendChild(section);
          if (item.examples && item.examples.length)
            item.examples.map((ex) =>
              rule.appendChild(listItemWitExample(ex))
            );

          const subRuleUL = document.createElement('ul'); // Subule container
          item.child.map((item) => {
            const subrule = listItemWithoutLink(item.number, item.subrule);
            subrule.className = 'subrule';
            subRuleUL.appendChild(subrule);
            rule.appendChild(subRuleUL);
            if (item.examples && item.examples.length)
              item.examples.map((ex) =>
                subrule.appendChild(listItemWitExample(ex))
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

  createList(rules);
};

populateRules();
