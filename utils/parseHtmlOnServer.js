import { JSDOM } from 'jsdom';
import { parse } from 'node-html-parser';
import qbParser from '/utils/qbParser';

const parseHtmlOnServer = (content) => {
  const dom = new JSDOM(content);
  const doc = dom.window.document;

  const pageContent = parse(content);

  const filteredPageContent = pageContent.childNodes.filter(
    ({ rawTagName }) => rawTagName
  );
  const contentArray = filteredPageContent.map((node) => {
    // Rebuild the object so that it has all the required attributes
    const elm = doc.createElement(node.rawTagName);
    const classList = Array.from(node.classList._set);
    elm.innerHTML = node.innerHTML;
    elm.rawAttrs = node.rawAttrs;
    classList.forEach((className) => elm.classList.add(className));
    elm.setAttribute('id', node.id);

    return elm;
  });

  const parsedContentArray = qbParser({ nodeList: contentArray });

  return parsedContentArray;
};

module.exports = { parseHtmlOnServer };
