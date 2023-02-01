import { type FC, type MouseEventHandler } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { dataIdLabel } from '../../../../../models/HtmlData';
import { useActiveIdContext } from '../../../../../providers/ActiveIdProvider';
import { useHtmlContext } from '../../../../../providers/HtmlProvider';
import type { ColorScheme } from '../../types';
import type { Style } from './type';

type StyleProps = {
  style: Style;
  colorScheme: ColorScheme;
};

const ElementStyle: FC<StyleProps> = ({ style, colorScheme }) => {
  const { setActiveIds } = useActiveIdContext();
  const htmlData = useHtmlContext();
  const { selector } = style;
  const elements = htmlData?.document.querySelectorAll<HTMLElement>(selector);
  const handleMouseOver: MouseEventHandler = () => {
    if (htmlData == null) return;
    if (elements == null) return;
    const elementIds = Array.from(elements).map(
      (element) => element.getAttribute(dataIdLabel) ?? ''
    );
    setActiveIds(elementIds);
  };
  const handleMouseLeave: MouseEventHandler = () => {
    if (htmlData == null) return;
    if (elements == null) return;
    setActiveIds([]);
  };

  return (
    <Box
      marginLeft="1em"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <Flex gap={1}>
        <Box color={colorScheme.cssTagName}>{style.selector}</Box>
        <Box color={colorScheme.cssBlanket}>&#123;</Box>
      </Flex>
      {style.attributes.map(
        (attribute) =>
          attribute && (
            <Flex key={attribute.name} marginLeft="1em">
              <Box color={colorScheme.cssAttributeName}>{attribute.name}</Box>
              <Box color={colorScheme.bridge}>:&thinsp;</Box>
              <Box color={colorScheme.cssAttributeValue}>{attribute.value}</Box>
              <Box color={colorScheme.bridge}>;</Box>
            </Flex>
          )
      )}
      <Box color={colorScheme.cssBlanket}>&#125;</Box>
    </Box>
  );
};

export { ElementStyle };
