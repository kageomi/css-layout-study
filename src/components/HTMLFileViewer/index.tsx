import { CSSProperties, FC, useEffect, useState } from 'react';
import { getDocumentFromHtml, documentToHtml } from './helper';
import { Box, Flex } from '@chakra-ui/react';

type Props = {
  path: string;
  style?: CSSProperties;
};

const HTMLFileViewer: FC<Props> = ({ path, style = {} }) => {
  const [html, setHtml] = useState<Document>();
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getHtmlText = async () => {
      const data = await fetch(path);
      const htmlText = await data.text();
      const { description, document } = getDocumentFromHtml(htmlText);
      // console.log(strippedHtmlText);
      setHtml(document);
      setDescription(description);
    };
    getHtmlText();
  }, [path]);

  const htmlText = html ? documentToHtml(html) : '';

  return (
    <Box style={style} bgColor="gray.50" rounded={5} padding={5}>
      <Box>
        <a href={path} target="_blank">
          show page
        </a>
        <div>{description}</div>
      </Box>
      <Flex justifyContent="space-around" gap="5%">
        <Box flexGrow={1} minWidth="50%">
          <pre style={{ overflow: 'auto' }}>{htmlText}</pre>
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
