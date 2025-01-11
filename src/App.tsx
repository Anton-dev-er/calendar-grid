import './App.css';
import Home from './pages/Home/Home.tsx';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme.ts';
import { CalendarContextProvider } from './contexts/CalendarContext.tsx';
import { TaskContextProvider } from './contexts/TaskContext.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CalendarContextProvider>
        <TaskContextProvider>
          <Home />
        </TaskContextProvider>
      </CalendarContextProvider>
    </ThemeProvider>
  );
}

export default App;
