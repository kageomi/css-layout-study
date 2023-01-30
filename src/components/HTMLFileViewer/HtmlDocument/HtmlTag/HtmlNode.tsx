import type { CSSProperties, FC } from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  node: ChildNode;
  style?: CSSProperties;
  color: string;
};

const HtmlNode: FC<Props> = ({ node, color, style = {} }) => {
  return (
    <Box style={style} marginLeft="1em" color={color}>
      {node.textContent}
    </Box>
  );
};

export { HtmlNode };
