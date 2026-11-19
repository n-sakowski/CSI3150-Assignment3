import { useState } from "react";
import ProductCard from "../components/ProductCard";

function CatalogPage({ albums, onAddToCart }) {
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Generate unique genres from the album dataset
  const genres = ["All", ...new Set(albums.map((album) => album.genre))];

  // Filter albums based on selected genre
  const filteredAlbums =
    selectedGenre === "All"
      ? albums
      : albums.filter((album) => album.genre === selectedGenre);

  return (
    <main className="main-content">
      <section className="catalog-hero">
        <h1>Welcome to VinylVault</h1>

        <p>
          Discover timeless records, legendary artists, and essential albums for
          your collection.
        </p>
      </section>

      <section>
        <div className="filter-bar">
          {genres.map((genre) => (
            <button
              key={genre}
              className={
                selectedGenre === genre ? "filter-pill active" : "filter-pill"
              }
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredAlbums.length > 0 ? (
            filteredAlbums.map((album) => (
              <ProductCard
                key={album.id}
                album={album}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <p>No albums found in this genre.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default CatalogPage;
