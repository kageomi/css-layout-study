import { CSSProperties, FC } from 'react';
import { HtmlNode } from './HtmlNode';
import { HtmlElement } from './HtmlElement';
import { HtmlStyle } from './HtmlStyle';
import { ColorScheme } from '../types';

type Props = {
  element: Element | ChildNode;
  style?: CSSProperties;
  colorScheme: ColorScheme;
};

const HtmlTag: FC<Props> = ({ element, colorScheme, style = {} }) => {
  if (element instanceof Element && element.tagName === 'STYLE')
    return (
      <HtmlStyle
        styleElement={element}
        style={style}
        colorScheme={colorScheme}
      />
    );
  return element instanceof Element ? (
    <HtmlElement element={element} style={style} colorScheme={colorScheme} />
  ) : (
    <HtmlNode node={element} style={style} color={colorScheme.textNode} />
  );
};

export { HtmlTag };