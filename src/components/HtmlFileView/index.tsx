import type { CSSProperties, FC } from 'react';
import { useEffect, useState } from 'react';
import { Box, Flex, Link, Heading, Tag, Spacer } from '@chakra-ui/react';
import { HtmlData } from '../../models/HtmlData';
import { HtmlDocument } from './HtmlDocument';

type Props = {
  path: string;
  style?: CSSProperties;
};

const HTMLFileView: FC<Props> = ({ path, style = {} }) => {
  const [html, setHtml] = useState<HtmlData>();

  useEffect(() => {
    const getHtmlText = async () => {
      const data = await fetch(path);
      const htmlText = await data.text();
      const htmlData = new HtmlData(htmlText);
      setHtml(htmlData);
    };
    void getHtmlText();
  }, [path]);

  return html ? (
    <Box style={style} bgColor="gray.50" rounded={5} padding={5}>
      <Box marginBottom={10}>
        <Heading>{html.title}</Heading>
        <Spacer height={5} />
        <Flex>
          {html.keywords.map((keyword) => (
            <Tag key={keyword} marginRight={2} colorScheme="cyan">
              {keyword}
            </Tag>
          ))}
        </Flex>
        <Spacer height={2} />
        <Box>{html.description}</Box>
        <Spacer height={5} />
        <Link color="teal.500" href={path} target="_blank">
          show page in new tab
        </Link>
      </Box>
      <Flex justifyContent="space-around" gap="5%">
        <Box flexGrow={1} maxWidth="50%">
          <HtmlDocument htmlDocument={html.document} />
        </Box>
        <Box flexGrow={1}>
          <iframe
            title={html?.title}
            style={{
              aspectRatio: '1/1',
              background: '#fff',
              width: '100%',
            }}
            frameBorder={0}
            srcDoc={html?.outerText}
          ></iframe>
        </Box>
      </Flex>
    </Box>
  ) : (
    <></>
  );
};

export { HTMLFileView };
