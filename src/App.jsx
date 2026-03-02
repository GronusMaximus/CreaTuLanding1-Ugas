import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const mensajeBienvenida = 'Bienvenidos al curso de React de CoderHouse';

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer greeting={mensajeBienvenida} />} />
        <Route path="/product/:productId" element={<ItemDetailContainer />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
