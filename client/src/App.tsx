import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { JsxAttributeLike, JsxElement } from 'typescript';

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
