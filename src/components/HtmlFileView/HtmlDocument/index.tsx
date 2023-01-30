import type { CSSProperties, FC } from 'react';
import { Box, Spacer } from '@chakra-ui/react';
import { HtmlRootTag } from './HtmlRootTag';
import { HtmlTag } from './HtmlTag';
import { colorScheme as defaultScheme } from './colorScheme';
import type { ColorScheme } from './types';

type Props = {
  htmlDocument: Document;
  style?: CSSProperties;
  colorScheme?: ColorScheme;
};

const HtmlDocument: FC<Props> = ({
  htmlDocument,
  style = {},
  colorScheme = defaultScheme,
}) => {
  return (
    <Box background={colorScheme.background} padding={2} rounded={5}>
      <HtmlRootTag colorScheme={colorScheme} style={style}>
        <Spacer height={2} />
        <HtmlTag
          element={htmlDocument.head}
          colorScheme={colorScheme}
          style={style}
        />
        <Spacer height={2} />
        <HtmlTag
          element={htmlDocument.body}
          colorScheme={colorScheme}
          style={style}
        />
        <Spacer height={2} />
      </HtmlRootTag>
    </Box>
  );
};

export { HtmlDocument };
