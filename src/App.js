import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {ProductListingProvider} from './components/ProductListingProvider'

function App() {
  
  return (
    <ProductListingProvider>
      <>
        <Header/>
      </>
    </ProductListingProvider>

  );
}

export default App;
