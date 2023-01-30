type HtmlFileDocument = {
  title: string;
  description: string;
  outerText: string;
  keywords: string[];
  document: Document;
};

const documentToHtml = (document: Document) => {
  const head = document.head.innerHTML.split(/\n\n/).join('');
  console.log(head);
  const breakLine = /\n\n/g;
  return `<html lang="en">
  \n${document.head.outerHTML}
  \n${document.body.outerHTML}
  \n</html>`;
  // \n${document.head.outerHTML.split(/\n\n/).join('')}
  // \n${document.body.outerHTML.split(/\n\n/).join('')}
};

const extractKeywords = (document: Document) => {
  const metas = document.querySelectorAll('meta');
  const keywords = Array.from(metas).find((meta) => meta.name === 'keywords');
  return keywords ? keywords.content.split(/\s*,\s*/) : [];
};

const extractTitle = (document: Document) => {
  const title = document.querySelector('title');
  return title ? title.innerText : '';
};

const extractDescription = (document: Document) => {
  const metas = document.querySelectorAll('meta');
  const description = Array.from(metas).find(
    (meta) => meta.name === 'description'
  );
  return description ? description.content : '';
};

const removeElements = (document: Document, tag: string) => {
  document.querySelectorAll(tag).forEach((elm) => elm.remove());
};

const getDocumentFromHtml = (htmlText: string): HtmlFileDocument => {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlText, 'text/html');
  const description = extractDescription(document);
  const title = extractTitle(document);
  const keywords = extractKeywords(document);
  removeElements(document, 'script');
  removeElements(document, 'meta');
  return {
    description,
    document,
    title,
    keywords,
    outerText: documentToHtml(document),
  };
};

export { getDocumentFromHtml };
export type { HtmlFileDocument };
