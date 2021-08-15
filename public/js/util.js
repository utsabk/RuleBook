'use strict';

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


export { listItemWithLink, listItemWithoutLink, listItemWitExample };
