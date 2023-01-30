import { CSSProperties, FC } from 'react';
import { ColorScheme } from '../../types';
import { Box } from '@chakra-ui/react';
import { Style } from './type';
import { ElementStyle } from './ElementStyle';

type Props = {
  styleElement: Element;
  style?: CSSProperties;
  colorScheme: ColorScheme;
};

const getStyleObject = (styleText: string): Style | null => {
  const selectorMatch = /\s*(.+)\s+?{/.exec(styleText);
  if (selectorMatch == null) return null;
  const selector = selectorMatch[1];
  const attributes = styleText
    .split(/\n/)
    .map((line) => {
      const match = /\s*(.+?):\s*(.+?);/.exec(line);
      if (match == null) return null;
      return {
        name: match[1],
        value: match[2],
      };
    })
    .filter((style) => style != null);
  return {
    selector,
    attributes,
  };
};

const HtmlStyle: FC<Props> = ({ styleElement, colorScheme, style = {} }) => {
  const { textContent, tagName } = styleElement;
  const tag = tagName.toLocaleLowerCase();
  const styles = textContent
    ?.replace(/\}/g, '}}')
    .split('}\n')
    .map((style) => getStyleObject(style));
  const styleComponents = styles?.map(
    (style) =>
      style && (
        <ElementStyle
          key={style.selector}
          style={style}
          colorScheme={colorScheme}
        />
      )
  );

  return (
    <Box style={style} marginLeft="1em">
      <Box display="inline-block" color={colorScheme.tagBlanket}>
        &lt;
      </Box>
      <Box display="inline-block" color={colorScheme.tagName}>
        {tag}
      </Box>
      <Box display="inline-block" color={colorScheme.tagBlanket}>
        &gt;
      </Box>
      {styleComponents}
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

export { HtmlStyle };
