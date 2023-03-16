import './App.css';
import { Header } from './components/header';
import { Main } from './components/main';
import { UserContextProvider } from './contexts/UserContext';
import './styles/theme1.css';

function App() 
{
  return (
    <div className="App">
      <UserContextProvider>
        <Header />
        <Main />
      </UserContextProvider>
    </div>
  );
}

export default App;
