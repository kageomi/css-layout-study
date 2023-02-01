import {
  type CSSProperties,
  type FC,
  useRef,
  useEffect,
  useState,
} from 'react';
import { Box, Flex, Link, Heading, Tag, Spacer } from '@chakra-ui/react';
import { HtmlData } from '../../models/HtmlData';
import { ActiveIdProvider } from '../../providers/ActiveIdProvider';
import { HtmlProvider } from '../../providers/HtmlProvider';
import { HtmlDocument } from './HtmlDocument';

type Props = {
  path: string;
  style?: CSSProperties;
};

const HTMLFileView: FC<Props> = ({ path, style = {} }) => {
  const [htmlData, setHtmlData] = useState<HtmlData>();
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef == null || iframeRef.current == null || htmlData == null)
      return undefined;
    htmlData.iframeDocument = iframeRef.current.contentDocument;
  }, [iframeRef, htmlData, activeIds]); // TODO: remove activeIds

  useEffect(() => {
    const getHtmlText = async () => {
      const data = await fetch(path);
      const htmlText = await data.text();
      const htmlData = new HtmlData(htmlText);
      setHtmlData(htmlData);
    };
    void getHtmlText();
  }, [path]);

  return htmlData ? (
    <Box style={style} bgColor="gray.50" rounded={5} padding={5}>
      <Box marginBottom={10}>
        <Heading>{htmlData.title}</Heading>
        <Spacer height={5} />
        <Flex>
          {htmlData.keywords.map((keyword) => (
            <Tag key={keyword} marginRight={2} colorScheme="cyan">
              {keyword}
            </Tag>
          ))}
        </Flex>
        <Spacer height={2} />
        <Box>{htmlData.description}</Box>
        <Spacer height={5} />
        <Link color="teal.500" href={path} target="_blank">
          show page in new tab
        </Link>
      </Box>
      <Flex justifyContent="space-around" gap="5%">
        <Box flexGrow={1} maxWidth="50%">
          <HtmlProvider htmlData={htmlData}>
            <ActiveIdProvider state={{ activeIds, setActiveIds }}>
              <HtmlDocument
                htmlDocument={htmlData.document}
                style={{ maxHeight: '80vh' }}
              />
            </ActiveIdProvider>
          </HtmlProvider>
        </Box>
        <Box flexGrow={1}>
          <iframe
            ref={iframeRef}
            title={htmlData.title}
            style={{
              aspectRatio: '1/1',
              background: '#fff',
              width: '100%',
            }}
            frameBorder={0}
            srcDoc={htmlData.outerText}
          ></iframe>
        </Box>
      </Flex>
    </Box>
  ) : (
    <></>
  );
};

export { HTMLFileView };
