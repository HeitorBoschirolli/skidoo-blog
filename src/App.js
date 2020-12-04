import { Container } from '@material-ui/core';
import 'fontsource-roboto';
import Home from './components/Home';
import PostsRow from './components/PostsRow';

function App() {
  return (
    <>
      <Home></Home>
      <Container>
        <PostsRow />
      </Container>
    </>
  );
}

export default App;
