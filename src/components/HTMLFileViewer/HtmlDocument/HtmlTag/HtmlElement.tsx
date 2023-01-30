import { CSSProperties, FC } from 'react';
import { ColorScheme } from '../types';
import { Box } from '@chakra-ui/react';
import { HtmlTag } from '.';

type Props = {
  element: Element;
  style?: CSSProperties;
  colorScheme: ColorScheme;
};

const HtmlElement: FC<Props> = ({ element, colorScheme, style = {} }) => {
  const representation = element.outerHTML.split(/\n/).join('');
  const { childNodes, tagName } = element;
  const tag = tagName.toLocaleLowerCase();
  const childNodeComponents = Array.from(childNodes).map((child, index) => {
    const key = `${index} ${
      child instanceof Element ? child.tagName : child.textContent
    }`;
    return <HtmlTag key={key} element={child} colorScheme={colorScheme} />;
  });

  return (
    <Box style={style} marginLeft="1em">
      <Box display="inline-block" color={colorScheme.tagBlanket}>
        &lt;
      </Box>
      <Box display="inline-block" color={colorScheme.tagName}>
        {tag}
      </Box>
      {/* TODO: attributes*/}
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
