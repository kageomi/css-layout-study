import { HTMLFileViewer } from './HtmlFileViewer';
import centering from '../html/centering.html?url';
import { Heading, Flex, Spacer } from '@chakra-ui/react';

const paths = [centering];

const BoxLab = () => {
  return (
    <>
      <Heading as="h1" size="4xl" textAlign="center" marginY={10}>
        BOX DOM LAB
      </Heading>
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

export { BoxLab };
