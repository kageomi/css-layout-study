import { uuidv4 } from '../util/uuid';

const dataIdLabel = 'data-elmid';
class HtmlData {
  iframeDocument: Document | null = null;
  dataIdLabel = dataIdLabel;
  #document: Document;
  #cleanedDocument: Document;

  constructor(htmlText: string) {
    this.#document = this.#getDocumentFromText(htmlText);
    this.#setRandomDataId(this.#document);
    this.#cleanedDocument = this.#getCleanedDocument(this.#document);
  }

  get document(): Document {
    return this.#cleanedDocument;
  }

  set document(document: Document) {
    const clonedDocument = this.#getClone(document);
    this.#document = clonedDocument;
  }

  get title(): string {
    const title = this.#document.querySelector('title');

    return title ? title.innerText : '';
  }

  get description(): string {
    const metas = this.#document.querySelectorAll('meta');
    const description = Array.from(metas).find(
      (meta) => meta.name === 'description'
    );

    return description ? description.content : '';
  }

  get keywords(): string[] {
    const metas = this.#document.querySelectorAll('meta');
    const keywords = Array.from(metas).find((meta) => meta.name === 'keywords');

    return keywords ? keywords.content.split(/\s*,\s*/) : [];
  }

  get outerText(): string {
    return this.#getTextFromDocument(this.#cleanedDocument);
  }

  setStyleToIframeElement(
    selector: string,
    { key, value }: { key: string; value: string }
  ): void {
    if (this.iframeDocument == null) return;
    Array.from(
      this.iframeDocument.querySelectorAll<HTMLElement>(selector)
    ).forEach((element) => {
      element.style.setProperty(key, value);
    });
  }

  #setRandomDataId(document: Document) {
    const uuid = uuidv4();
    Array.from(document.querySelectorAll<HTMLElement>('*')).forEach(
      (element, index) => {
        element.setAttribute(this.dataIdLabel, `${uuid}-${index}`);
      }
    );
  }

  #getCleanedDocument(document: Document): Document {
    const clonedDocument = this.#getClone(document);
    this.#cleanupDocument(clonedDocument);

    return clonedDocument;
  }

  #cleanupDocument(document: Document) {
    this.#removeElements(document, 'meta');
    this.#removeElements(document, 'script');
  }

  #removeElements(document: Document, selector: string) {
    document.querySelectorAll(selector).forEach((elm) => {
      elm.remove();
    });
  }

  #getTextFromDocument(document: Document) {
    return `<html lang="en">
    \n${document.head.outerHTML}
    \n${document.body.outerHTML}
    \n</html>`;
  }

  #getDocumentFromText(htmlText: string) {
    const parser = new DOMParser();
    const document = parser.parseFromString(htmlText, 'text/html');

    return document;
  }

  #getClone(document: Document) {
    return this.#getDocumentFromText(this.#getTextFromDocument(document));
  }
}

export { HtmlData, dataIdLabel };
