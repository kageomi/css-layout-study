import { CSSProperties, FC, useEffect, useState } from 'react';
import { removeScripts } from './helper';

type Props = {
  path: string;
  style?: CSSProperties;
};

const HTMLFileViewer: FC<Props> = ({ path, style = {} }) => {
  const [htmlText, setHtmlText] = useState('');

  useEffect(() => {
    const getHtmlText = async () => {
      const data = await fetch(path);
      const htmlText = await data.text();
      const strippedHtmlText = removeScripts(htmlText);
      setHtmlText(strippedHtmlText);
    };
    getHtmlText();
  }, [path]);
  const css: CSSProperties = {
    ...style,
    background: '#f6f6f6',
    borderRadius: '20px',
    padding: '20px',
  };
  return (
    <div style={css}>
      <div>
        <a href={path} target="_blank">
          show page
        </a>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: '5%',
        }}
      >
        <div style={{ flexGrow: 1, maxWidth: '50%' }}>
          <pre style={{ overflow: 'auto' }}>{htmlText}</pre>
        </div>
        <div style={{ flexGrow: 1 }}>
          <iframe
            style={{
              aspectRatio: '1/1',
              background: '#fff',
              width: '100%',
            }}
            frameBorder={0}
            src={path}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export { HTMLFileViewer };
