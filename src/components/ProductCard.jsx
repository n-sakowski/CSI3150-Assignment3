import { Link } from "react-router-dom";

function ProductCard({ album, onAddToCart }) {
  return (
    <article className="product-card">
      <Link to={`/album/${album.id}`}>
        <img src={album.image} alt={album.title} className="product-image" />
      </Link>

      <div className="product-body">
        <span className="product-category">{album.genre}</span>

        <h3 className="product-title">
          <Link to={`/album/${album.id}`}>{album.title}</Link>
        </h3>

        <p>{album.artist}</p>

        <p className="product-price">${album.price.toFixed(2)}</p>

        <p className="product-stock">
          {album.stock > 0 ? `${album.stock} in stock` : "Out of stock"}
        </p>

        <button
          className="btn btn-primary btn-block"
          onClick={() => onAddToCart(album)}
          disabled={album.stock <= 0}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
