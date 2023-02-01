import type { CSSProperties, FC } from 'react';
import { Box, Flex, type FlexProps } from '@chakra-ui/react';
import type { ColorScheme } from '../types';

type Props = {
  attrKey: string;
  attrValue: string;
  colorScheme: ColorScheme;
  style?: CSSProperties;
} & FlexProps;

const HtmlAttribute: FC<Props> = ({
  attrKey,
  attrValue,
  colorScheme,
  style = {},
  ...props
}) => {
  const length = `${attrKey}="${attrValue}"`.length;

  return (
    <Flex style={style} {...props} minWidth={`${length}em`}>
      <Box color={colorScheme.attributeName}>{attrKey}</Box>
      <Box color={colorScheme.bridge}>=</Box>
      <Box color={colorScheme.attributeValue}>{`"${attrValue}"`}</Box>
    </Flex>
  );
};

export { HtmlAttribute };
