import type { CSSProperties, FC, MouseEventHandler } from 'react';
import { Box } from '@chakra-ui/react';
import { dataIdLabel } from '../../../../models/HtmlData';
import { useActiveIdContext } from '../../../../providers/ActiveIdProvider';
import { useHtmlContext } from '../../../../providers/HtmlProvider';
import type { ColorScheme } from '../types';
import { HtmlAttribute } from './HtmlAttribute';
import { HtmlTag } from '.';

const ACTIVE_ELEMENT_BG_COLOR = 'rgba(255,0,0,0.1)';
const NO_STYLED_TAGS = ['head', 'style', 'meta', 'title'];

type Props = {
  element: HTMLElement;
  style?: CSSProperties;
  colorScheme: ColorScheme;
};

const extractAttributes = (tagText: string) => {
  const matches = tagText.matchAll(/\s([^\s]+?)="([^\s]+?)"/g) ?? [];
  const attributes = [...matches]
    .map((match) => ({
      key: match[1],
      value: match[2],
    }))
    .filter((attribute) => attribute.key !== dataIdLabel);

  return attributes;
};

const HtmlElement: FC<Props> = ({ element, colorScheme, style = {} }) => {
  const representation = element.outerHTML.split(/>/)[0].split(/\n/).join('');
  const attributes = extractAttributes(representation);
  const { activeIds, setActiveIds } = useActiveIdContext();
  const htmlData = useHtmlContext();
  const { childNodes, tagName } = element;
  const elementId = element.getAttribute(dataIdLabel);
  const isActive = elementId != null && activeIds.includes(elementId);
  const selector = `[${htmlData?.dataIdLabel}="${elementId ?? ''}"]`;
  const tag = tagName.toLocaleLowerCase();
  const backgroundColor =
    isActive && !NO_STYLED_TAGS.includes(tag) ? ACTIVE_ELEMENT_BG_COLOR : '';
  const childNodeComponents = Array.from(childNodes).map((child, index) => {
    const key = `${index} ${child instanceof HTMLElement ? child.tagName : ''}`;

    return <HtmlTag key={key} element={child} colorScheme={colorScheme} />;
  });
  const attributeComponents = attributes.map(({ key, value }) => (
    <HtmlAttribute
      key={key}
      marginLeft="1em"
      attrKey={key}
      attrValue={value}
      colorScheme={colorScheme}
    />
  ));

  const handleMouseOver: MouseEventHandler = (event) => {
    event.stopPropagation();
    if (htmlData == null) return;
    const document = htmlData.document;
    const element = document.querySelector<HTMLElement>(selector);
    if (element == null) return;
    if (tag !== 'head') setActiveIds(elementId != null ? [elementId] : []);
    console.info('over', htmlData.iframeDocument);
    htmlData.setStyleToIframeElement(selector, {
      key: 'background-color',
      value: ACTIVE_ELEMENT_BG_COLOR,
    });
  };
  const handleMouseOut: MouseEventHandler = (event) => {
    event.stopPropagation();
    if (htmlData == null) return;
    const document = htmlData.document;
    const element = document.querySelector<HTMLElement>(selector);
    if (element == null) return;
    if (tag !== 'head') setActiveIds([]);
    console.info('leave', htmlData.iframeDocument);
    htmlData.setStyleToIframeElement(selector, {
      key: 'background-color',
      value: '',
    });
  };

  return (
    <Box
      style={style}
      marginLeft="1em"
      background={backgroundColor}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Box display="inline-block" color={colorScheme.tagBlanket}>
        &lt;
      </Box>
      <Box display="inline-block" color={colorScheme.tagName}>
        {tag}
      </Box>
      {attributeComponents}
      <Box display="inline-block" color={colorScheme.tagBlanket}>
        &gt;
      </Box>
      {childNodeComponents}
      <Box display="inline-block" color={colorScheme.tagBlanket}>
        &lt;
      </Box>
      <Box display="inline-block" color={colorScheme.tagBlanket}>
        &frasl;
      </Box>
      <Box display="inline-block" color={colorScheme.tagName}>
        {tag}
      </Box>
      <Box display="inline-block" color={colorScheme.tagBlanket}>
        &gt;
      </Box>
    </Box>
  );
};

export { HtmlElement };
