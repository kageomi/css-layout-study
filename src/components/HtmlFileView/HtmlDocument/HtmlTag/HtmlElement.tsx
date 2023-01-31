import type { CSSProperties, FC } from 'react';
import { Box } from '@chakra-ui/react';
import { useActiveIdContext } from '../../../../providers/ActiveIdProvider';
import type { ColorScheme } from '../types';
import { HtmlTag } from '.';

type Props = {
  element: HTMLElement;
  style?: CSSProperties;
  colorScheme: ColorScheme;
};

const HtmlElement: FC<Props> = ({ element, colorScheme, style = {} }) => {
  const { activeId } = useActiveIdContext();
  const { childNodes, tagName, dataset } = element;
  const isActive = dataset.id === activeId;
  const backgroundColor = isActive ? 'rgba(255,255,0,0.05)' : '';
  const tag = tagName.toLocaleLowerCase();
  const childNodeComponents = Array.from(childNodes).map((child, index) => {
    const key = `${index} ${child instanceof HTMLElement ? child.tagName : ''}`;

    return <HtmlTag key={key} element={child} colorScheme={colorScheme} />;
  });

  return (
    <Box style={style} marginLeft="1em" background={backgroundColor}>
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
