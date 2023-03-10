import type { FC } from 'react';
import { Heading, Flex, Box, Spacer } from '@chakra-ui/react';
import centeringWithGrid from '../html/centering-grid.html?url';
import centering from '../html/centering.html?url';
import { HTMLFileView } from './HtmlFileView';

const paths = [centering, centeringWithGrid];

const LayoutStudy: FC = () => {
  return (
    <>
      <Heading as="h1" size="4xl" textAlign="center" marginY={10}>
        CSS LAYOUT STUDY
      </Heading>
      <Box fontSize="1.5em" paddingX="5%" textAlign="center">
        a repository for self study about layout by css
      </Box>
      <Spacer height="5em" />
      <Flex flexDirection="column" alignItems="center" gap={10}>
        {paths.map((path) => (
          <HTMLFileView
            key={path}
            path={path}
            style={{ width: '90%' }}
          ></HTMLFileView>
        ))}
      </Flex>
    </>
  );
};

export { LayoutStudy };
