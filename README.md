Assignment 3: VinylVault Indie Record Online Store

Prerequisites to install:
- Node.js
- npm
- Git
Confirm that each prerequisite is installed by running
**{prerequisite_name} -v**
for each in the command prompt.

Install the project locally by opening a command prompt in the folder where you want this installed and running the following commands:
**git clone https://github.com/n-sakowski/CSI3150-Assignment3.git**
**cd CSI3150-Assignment3**
**npm install**

Next, start the application by running:
**npm run dev**
A localhost link will be provided, probably http://localhost:5173/. Here is where the VinylVault should be displayed. 

Project Directory Overview: 
VinylVault is designed using React and Vite. src/ contains the main application code, React components, page layouts, routing logic, and styling. public/ contains static Vite assets. node_modules contains npm dependencies.

Component Tree:
<App /> → src/App.jsx
│
│  State Ownership:
│  - cart (Array): Stores albums and their quantities.
│  - isCartOpen (Boolean): Controls cart drawer visibility.
│
│  Callback Handlers:
│  - onAddToCart(album)
│  - onRemoveFromCart(albumId)
│  - onUpdateQuantity(albumId, amount)
│  - onToggleCart()
│  - onCheckoutComplete()
│
├── <Navbar /> → src/components/Navbar.jsx
│   - State: None.
│   - Props:
│     - cartCount (Number)
│     - onToggleCart (Function)
│   - Displays navigation and synchronized cart count.
│
├── <Routes>
│   │
│   ├── <Route path="/" element={<CatalogPage />} />
│   │   │
│   │   └── <CatalogPage />
│   │       → src/pages/CatalogPage.jsx
│   │       - State:
│   │         - selectedGenre (String)
│   │       - Props:
│   │         - albums (Array)
│   │         - onAddToCart (Function)
│   │       │
│   │       ├── <GenreFilterBar />
│   │       │   → src/components/GenreFilterBar.jsx
│   │       │   - State: None.
│   │       │   - Props:
│   │       │     - selectedGenre (String)
│   │       │     - onGenreChange (Function)
│   │       │
│   │       └── <AlbumGrid />
│   │           → src/components/AlbumGrid.jsx
│   │           - State: None.
│   │           - Props:
│   │             - albums (Array)
│   │             - onAddToCart (Function)
│   │           │
│   │           └── <AlbumCard /> (.map() iterator)
│   │               → src/components/AlbumCard.jsx
│   │               - State: None.
│   │               - Props:
│   │                 - album (Object)
│   │                 - onAddToCart (Function)
│   │               - Callback: onAddToCart(album)
│   │               - Navigation: /album/:albumId
│   │
│   ├── <Route path="/album/:albumId"
│   │          element={<AlbumDetailPage />} />
│   │   │
│   │   └── <AlbumDetailPage />
│   │       → src/pages/AlbumDetailPage.jsx
│   │       - State: None.
│   │       - Props:
│   │         - albums (Array)
│   │         - onAddToCart (Function)
│   │       - Uses useParams() to identify album.
│   │       - Callback: onAddToCart(album)
│   │
│   └── <Route path="/checkout"
│              element={<CheckoutPage />} />
│       │
│       └── <CheckoutPage />
│           → src/pages/CheckoutPage.jsx
│           - State:
│             - shippingInfo (Object)
│             - orderConfirmed (Boolean)
│           - Props:
│             - cart (Array)
│             - onCheckoutComplete (Function)
│           - Callback: onCheckoutComplete()
│
└── <CartDrawer /> → src/components/CartDrawer.jsx
    - State: None.
    - Props:
      - cart (Array)
      - isCartOpen (Boolean)
      - onToggleCart (Function)
      - onUpdateQuantity (Function)
      - onRemoveFromCart (Function)
    - Displays cart items, quantities, and calculated totals.
