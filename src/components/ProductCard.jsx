import { FiShoppingBag } from 'react-icons/fi';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title.length > 40 ? product.title.substring(0, 40) + '...' : product.title}</h3>
        <div className="product-footer">
          <span className="product-price">৳{product.price.toFixed(2)}</span>
          <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
            <FiShoppingBag /> Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
