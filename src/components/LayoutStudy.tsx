import { HTMLFileViewer } from './HtmlFileViewer';
import centering from '../html/centering.html?url';
import { Heading, Flex, Box, Spacer } from '@chakra-ui/react';

const paths = [centering];

const LayoutStudy = () => {
  return (
    <>
      <Heading as="h1" size="4xl" textAlign="center" marginY={10}>
        CSS LAYOUT STUDY
      </Heading>
      <Box fontSize="1.5em" paddingX="5%" textAlign="center">
        a repository for self study about layout by csss
      </Box>
      <Spacer height="5em" />
      <Flex flexDirection="column" alignItems="center" gap={10}>
        {paths.map((path) => (
          <HTMLFileViewer
            key={path}
            path={path}
            style={{ maxHeight: '30%', width: '90%' }}
          ></HTMLFileViewer>
        ))}
      </Flex>
    </>
  );
};

export { LayoutStudy };
