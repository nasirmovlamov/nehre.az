import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Switch>
          <Route path="/">
            <Header/>
          </Route>
          
    </Switch>
    </Router>
  );
}

export default App;
