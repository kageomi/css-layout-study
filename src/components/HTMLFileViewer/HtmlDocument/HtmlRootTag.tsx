import { CSSProperties, FC } from 'react';
import { ColorScheme } from './types';
import { Box } from '@chakra-ui/react';

type Props = {
  style?: CSSProperties;
  children?: JSX.Element | JSX.Element[];
  colorScheme: ColorScheme;
};

const HtmlRootTag: FC<Props> = ({ colorScheme, style = {}, children = [] }) => {
  const tag = 'html';
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
      {children}
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

export { HtmlRootTag };
