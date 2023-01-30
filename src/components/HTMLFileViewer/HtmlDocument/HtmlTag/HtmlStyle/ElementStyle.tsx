import { ColorScheme } from '../../types';
import { Box, Flex } from '@chakra-ui/react';
import { Style } from './type';

type StyleProps = {
  style: Style;
  colorScheme: ColorScheme;
};

const ElementStyle = ({ style, colorScheme }: StyleProps) => {
  return (
    <Box marginLeft="1em">
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
