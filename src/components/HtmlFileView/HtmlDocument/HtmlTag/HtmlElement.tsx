import type { CSSProperties, FC, MouseEventHandler } from 'react';
import { Box } from '@chakra-ui/react';
import { useActiveIdContext } from '../../../../providers/ActiveIdProvider';
import { useHtmlContext } from '../../../../providers/HtmlProvider';
import type { ColorScheme } from '../types';
import { HtmlTag } from '.';

const ACTIVE_ELEMENT_BG_COLOR = 'rgba(255,0,0,0.1)';

type Props = {
  element: HTMLElement;
  style?: CSSProperties;
  colorScheme: ColorScheme;
};

const HtmlElement: FC<Props> = ({ element, colorScheme, style = {} }) => {
  const { activeId, setActiveId } = useActiveIdContext();
  const htmlData = useHtmlContext();
  const { childNodes, tagName, dataset } = element;
  const isActive = dataset.id === activeId;
  const elementId = dataset.id ?? '';
  const selector = `[data-id="${dataset.id ?? ''}"]`;
  const backgroundColor = isActive ? ACTIVE_ELEMENT_BG_COLOR : '';
  const tag = tagName.toLocaleLowerCase();
  const childNodeComponents = Array.from(childNodes).map((child, index) => {
    const key = `${index} ${child instanceof HTMLElement ? child.tagName : ''}`;

    return <HtmlTag key={key} element={child} colorScheme={colorScheme} />;
  });

  const handleMouseOver: MouseEventHandler = (event) => {
    event.stopPropagation();
    if (htmlData == null) return;
    const document = htmlData.document;
    const element = document.querySelector<HTMLElement>(selector);
    if (element == null) return;
    if (tag !== 'head') setActiveId(elementId);
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
    if (tag !== 'head') setActiveId('');
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
      {/* TODO: attributes */}
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
