import { CSSProperties, FC, useEffect, useState } from 'react';
import { getDocumentFromHtml, HtmlFileDocument } from './helper';
import { Box, Flex, Link, Heading } from '@chakra-ui/react';

type Props = {
  path: string;
  style?: CSSProperties;
};

const HTMLFileViewer: FC<Props> = ({ path, style = {} }) => {
  const [html, setHtml] = useState<HtmlFileDocument>();

  useEffect(() => {
    const getHtmlText = async () => {
      const data = await fetch(path);
      const htmlText = await data.text();
      const fileDocument = getDocumentFromHtml(htmlText);
      setHtml(fileDocument);
    };
    getHtmlText();
  }, [path]);

  return (
    <Box style={style} bgColor="gray.50" rounded={5} padding={5}>
      <Box marginBottom={20}>
        <Heading>{html?.title}</Heading>
        <Box marginY={5}>{html?.description}</Box>
        <Link color="teal.500" href={path} target="_blank">
          show page in new tab
        </Link>
      </Box>
      <Flex justifyContent="space-around" gap="5%">
        <Box flexGrow={1} minWidth="50%">
          <pre style={{ overflow: 'auto' }}>{html?.outerText}</pre>
        </Box>
        <Box flexGrow={1}>
          <iframe
            style={{
              aspectRatio: '1/1',
              background: '#fff',
              width: '100%',
            }}
            frameBorder={0}
            src={path}
          ></iframe>
        </Box>
      </Flex>
    </Box>
  );
};

export { HTMLFileViewer };
