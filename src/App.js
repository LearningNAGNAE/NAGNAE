import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import SignPage from './pages/SignPage';
import ChatBotPage from './pages/ChatBotPage';
// 1. import `ChakraProvider` component
import './assets/styles/global.css';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <Header  />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ChatBotPage" element={<ChatBotPage />} />
            <Route path="/SignPage" element={<SignPage />} />
            <Route path="/ContactPage" element={<ContactPage />} />
            <Route path="/AboutPage" element={<AboutPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;