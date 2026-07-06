import { FiX, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, toggleCart, cartItems, removeFromCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout', { state: { items: cartItems, total: total } });
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={toggleCart}><FiX /></button>
        </div>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.title.substring(0, 30)}...</h4>
                  <span className="cart-item-price">৳{item.price.toFixed(2)}</span>
                </div>
                {removeFromCart && (
                  <button className="icon-btn" onClick={() => removeFromCart(index)}><FiTrash2 /></button>
                )}
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <span>৳{total.toFixed(2)}</span>
          </div>
          <button 
            className="btn btn-primary checkout-btn" 
            onClick={handleCheckout} 
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};
export default Cart;
