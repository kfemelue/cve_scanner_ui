import { useState } from 'react';
import { Upload } from './components/Upload.jsx';
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [result, setResult] = useState({})

  return (
    <main>
        <Upload />
        <section id="results-component">


        </section>
    </main>
  )
}

export default App
