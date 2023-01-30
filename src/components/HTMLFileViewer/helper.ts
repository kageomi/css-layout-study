const documentToHtml = (document: Document) => {
  const head = document.head.innerHTML.split(/\n\n/).join('');
  console.log(head);
  const breakLine = /\n\n/g;
  return `<html lang="en">
  \n${document.head.outerHTML.split(/\n\n/).join('')}
  \n${document.body.outerHTML.split(/\n\n/).join('')}
  \n</html>`;
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

const getDocumentFromHtml = (htmlText: string) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlText, 'text/html');
  const description = extractDescription(document);
  removeElements(document, 'script');
  removeElements(document, 'meta');
  return {
    description,
    document,
  };
};

export { getDocumentFromHtml, documentToHtml };
