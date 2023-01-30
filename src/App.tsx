import './App.css';
import { ChakraProvider } from '@chakra-ui/react';

import { BoxLab } from './components/BoxLab';

const App = () => {
  return (
    <ChakraProvider>
      <BoxLab />;
    </ChakraProvider>
  );
};

export default App;
