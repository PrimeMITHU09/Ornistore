import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Categories from './pages/Categories';
import Cart from './components/Cart';
import Auth from './pages/Auth';
import TrackOrder from './pages/TrackOrder';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function PageTransition({ children }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="fade-in-page">
      {children}
    </div>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [currentUser, setCurrentUser] = useState(null);
  const [profileVersion, setProfileVersion] = useState(0);
  const [authLoading, setAuthLoading] = useState(true);

  const onProfileSave = () => setProfileVersion(v => v + 1);

  useEffect(() => {
    import('./firebase').then(({ auth }) => {
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
            localStorage.setItem('isLoggedIn', 'true');
          } else {
            setIsLoggedIn(false);
            setCurrentUser(null);
            localStorage.setItem('isLoggedIn', 'false');
          }
          setAuthLoading(false);
        });
      });
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    import('./firebase').then(({ auth }) => {
      import('firebase/auth').then(({ signOut }) => {
        signOut(auth).then(() => {
          localStorage.setItem('isLoggedIn', 'false');
          setIsLoggedIn(false);
        });
      });
    });
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <ScrollToTop />
      
      {/* Deep Space Theme Background */}
      <div className="starfield-container">
        <div className="stars"></div>
        <div className="planet planet-1"></div>
        <div className="planet planet-2"></div>
        <div className="planet planet-3"></div>
      </div>

      <div className="app-container">
        <Navbar 
          cartCount={cartItems.length} 
          toggleCart={toggleCart}
          theme={theme}
          toggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          user={currentUser}
          profileVersion={profileVersion}
        />
      </div>
      <Cart 
        isOpen={isCartOpen} 
        toggleCart={toggleCart} 
        cartItems={cartItems} 
        removeFromCart={removeFromCart}
      />
      <PageTransition>
        <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/checkout" element={<Checkout clearCart={clearCart} user={currentUser} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth handleLogin={handleLogin} />} />
            <Route path="/profile" element={<Profile user={currentUser} onProfileSave={onProfileSave} authLoading={authLoading} />} />
            <Route path="/my-orders" element={<MyOrders user={currentUser} authLoading={authLoading} />} />
        </Routes>
      </PageTransition>
      <Footer />
    </Router>
  );
}

export default App;
