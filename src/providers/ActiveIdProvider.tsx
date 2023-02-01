import type React from 'react';
import { type FC, type Dispatch, useContext } from 'react';
import { createContext } from 'react';

type ActiveIdContextValue = {
  activeIds: string[];
  setActiveIds: Dispatch<React.SetStateAction<string[]>>;
};

type Props = {
  state: ActiveIdContextValue;
  children?: JSX.Element | JSX.Element[];
};

const ActiveIdContext = createContext<ActiveIdContextValue>(undefined as never);

const ActiveIdProvider: FC<Props> = ({ state, children }) => {
  const { activeIds, setActiveIds } = state;
  const value = { activeIds, setActiveIds };

  return (
    <ActiveIdContext.Provider value={value}>
      {children}
    </ActiveIdContext.Provider>
  );
};

const useActiveIdContext = (): ActiveIdContextValue =>
  useContext(ActiveIdContext);

export { ActiveIdProvider, ActiveIdContext, useActiveIdContext };
