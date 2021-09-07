import './App.css';
//import components:
import Home from './components/home';
import Navbar from './components/navbar';
import Footer from './components/footer';
//improt tipos de datos de TS:
import { JsxAttributeLike, JsxElement } from 'typescript';
//import tipo de fuente:
import "@fontsource/comfortaa"


function App():JSX.Element {
  return (
    <div id="app" >
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
