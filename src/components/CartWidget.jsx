function CartWidget() {
  return (
    <div className="cart-widget" aria-label="Carrito de compras">
      <span className="cart-icon" role="img" aria-hidden="true">🛒</span>
      <span className="cart-count">0</span>
    </div>
  );
}

export default CartWidget;
