import { useParams, Link } from "react-router-dom";

function AlbumDetailPage({ albums, onAddToCart }) {
  const { albumId } = useParams();

  // Find the selected album
  const album = albums.find((item) => item.id === albumId);

  // Handle invalid album IDs
  if (!album) {
    return (
      <main className="main-content">
        <h2>Album Not Found</h2>
        <p>Sorry, we couldn't find that album.</p>

        <Link to="/" className="btn btn-primary">
          Return to Collection
        </Link>
      </main>
    );
  }

  return (
    <main className="main-content">
      <Link to="/" className="nav-link">
        &larr; Back to Collection
      </Link>

      <div className="detail-grid">
        <div>
          <img src={album.image} alt={album.title} className="detail-img" />
        </div>

        <div>
          <span className="product-category">{album.genre}</span>

          <h1>{album.title}</h1>

          <h2>{album.artist}</h2>

          <p className="product-price">${album.price.toFixed(2)}</p>

          <p>{album.description}</p>

          <p>
            {album.stock > 0
              ? `${album.stock} copies available`
              : "Out of stock"}
          </p>

          <button
            className="btn btn-primary"
            onClick={() => onAddToCart(album)}
            disabled={album.stock <= 0}
          >
            Add to Cart
          </button>

          <section style={{ marginTop: "2rem" }}>
            <h3>Vinyl Specifications</h3>

            <p>
              <strong>Catalog Number:</strong> {album.specs.catalogNumber}
            </p>

            <p>
              <strong>Weight:</strong> {album.specs.weight}
            </p>

            <p>
              <strong>Speed:</strong> {album.specs.speed}
            </p>

            <p>
              <strong>Label:</strong> {album.specs.label}
            </p>
          </section>

          <section style={{ marginTop: "2rem" }}>
            <h3>Tracklist</h3>

            <ol>
              {album.tracklist.map((track, index) => (
                <li key={index}>{track}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}

export default AlbumDetailPage;
