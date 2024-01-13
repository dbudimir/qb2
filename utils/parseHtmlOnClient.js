'use client';
import { parse } from 'node-html-parser';
import qbParser from '/utils/qbParser';

const parseHtmlOnClient = (content) => {
  const pageContent = parse(content);

  const filteredPageContent = pageContent.childNodes.filter(
    ({ rawTagName }) => rawTagName
  );
  const contentArray = filteredPageContent.map((node) => {
    // Rebuild the object so that it has all the required attributes
    const elm = document.createElement(node.rawTagName);
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

module.exports = { parseHtmlOnClient };
