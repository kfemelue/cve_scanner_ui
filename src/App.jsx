import { useState, createContext, useContext } from 'react';
import { Upload } from './components/Upload.jsx';
import { ResultsComponent } from './components/Results.jsx';
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

export const ResultsJSON = createContext();

function App() {
  const [results, setResults] = useState(null);

  return (
    <ResultsJSON.Provider value={{ results, setResults }}>
      <main>
        <Upload />
        {results && (<ResultsComponent />)}

      </main>
    </ResultsJSON.Provider>
  )
}

export default App
