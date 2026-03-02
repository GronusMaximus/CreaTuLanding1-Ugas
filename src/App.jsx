import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  const mensajeBienvenida = 'Bienvenidos al curso de React de CoderHouse';

  return (
    <>
      <NavBar />
      <ItemListContainer greeting={mensajeBienvenida} />
    </>
  );
}

export default App;
