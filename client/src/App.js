import { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './utils/globalStyles';
import { lightTheme, darkTheme } from "./utils/Themes"

function App() {
  const [theme, setTheme] = useState('light');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (  
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
      <GlobalStyles/>
        <Routes>
          <Route exact path='/' element={<Dashboard themeToggler={themeToggler} theme={theme}/>}/>
          <Route exact path='/teamSync' element={<Landing/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
