import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ChatBotPage from './pages/ChatBotPage';
// 1. import `ChakraProvider` component
import './assets/styles/global.css';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ContactPage" element={<ContactPage />} />
            <Route path="/AboutPage" element={<AboutPage />} />
            <Route path="/ChatBotPage" element={<ChatBotPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;