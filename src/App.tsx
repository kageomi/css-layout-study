import './App.css';
import { ChakraProvider } from '@chakra-ui/react';

import { LayoutStudy } from './components/LayoutStudy';

const App = () => {
  return (
    <ChakraProvider>
      <LayoutStudy />;
    </ChakraProvider>
  );
};

export default App;
