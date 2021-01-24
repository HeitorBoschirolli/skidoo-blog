import 'fontsource-roboto';
import Header from './components/Header';
import Home from './pages/Home';
import {Route, BrowserRouter as Router} from "react-router-dom";
import JavaLambdaPartOne from './pages/JavaLambdaPartOne';

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Home}/>
      <Route path="/java-lambda-part-one" exact component={JavaLambdaPartOne}/>
    </Router>
  );
}

export default App;
