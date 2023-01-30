import './App.css';
import { type FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { LayoutStudy } from './components/LayoutStudy';

const App: FC = () => {
  return (
    <ChakraProvider>
      <LayoutStudy />;
    </ChakraProvider>
  );
};

export default App;
