import CartWidget from './CartWidget';

function NavBar() {
  return (
    <header className="navbar">
      <h1 className="brand">React Store</h1>
      <nav>
        <ul className="nav-links">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>
      <CartWidget />
    </header>
  );
}

export default NavBar;
