import { type FC, useContext } from 'react';
import { createContext } from 'react';
import { type HtmlData } from '../models/HtmlData';

type Props = {
  htmlData: HtmlData;
  children?: JSX.Element | JSX.Element[];
};

const HtmlContext = createContext<HtmlData>(undefined as never);

const HtmlProvider: FC<Props> = ({ htmlData, children }) => {
  return (
    <HtmlContext.Provider value={htmlData}>{children}</HtmlContext.Provider>
  );
};

const useHtmlContext = (): HtmlData => useContext(HtmlContext);

export { HtmlProvider, HtmlContext, useHtmlContext };
