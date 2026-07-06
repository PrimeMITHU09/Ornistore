import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiUser, FiSun, FiMoon, FiLogOut } from 'react-icons/fi';

const Navbar = ({ cartCount, toggleCart, theme, toggleTheme, isLoggedIn, handleLogout, user }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const searchableItems = [
    { name: "Any App Trials for Card", link: "/products" },
    { name: "Facebook Verified Badge", link: "/products" },
    { name: "Any VPN for Mastercard", link: "/products" },
    { name: "Google Play Pass for Card", link: "/products" },
    { name: "Premium Virtual Card", link: "/categories" },
    { name: "YouTube Premium", link: "/categories" },
    { name: "NordVPN", link: "/categories" },
    { name: "ExpressVPN", link: "/categories" },
    { name: "Surfshark", link: "/categories" },
    { name: "CyberGhost", link: "/categories" },
    { name: "IPVanish", link: "/categories" },
    { name: "Private Internet Access", link: "/categories" },
  ];

  const filteredItems = searchQuery.trim() === '' ? [] : searchableItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearchSelect = (item) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(item.link, { state: { product: item.name } });
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <h1 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '800', 
            margin: 0, 
            background: 'linear-gradient(135deg, #38bdf8, #8b5cf6)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Orni Store
          </h1>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {!isLoggedIn ? (
            <>
              <li><Link to="/auth" style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>Login</Link></li>
              <li><Link to="/auth" style={{ color: '#10b981', fontWeight: 'bold' }}>Sign Up</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/my-orders" style={{ color: '#10b981', fontWeight: 'bold' }}>My Orders</Link></li>
              <li><Link to="/track" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Track Order</Link></li>
            </>
          )}
        </ul>
        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          
          <div style={{ position: 'relative' }}>
            <button className="icon-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <FiSearch />
            </button>
            {isSearchOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '10px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '15px', width: '300px', zIndex: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}>
                <input
                  type="text"
                  placeholder="Search for any service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--secondary-color)', background: 'rgba(0,0,0,0.2)', color: '#fff', outline: 'none' }}
                />
                {filteredItems.length > 0 && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: '15px 0 0 0', maxHeight: '200px', overflowY: 'auto' }}>
                    {filteredItems.map((item, idx) => (
                      <li key={idx} onClick={() => handleSearchSelect(item)} style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', color: '#cbd5e1', transition: 'all 0.2s ease', borderRadius: '8px' }} onMouseOver={(e) => { e.currentTarget.style.color = 'var(--secondary-color)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'transparent'; }}>
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
                {searchQuery.trim() !== '' && filteredItems.length === 0 && (
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '15px 0 0 0', textAlign: 'center' }}>No results found</p>
                )}
              </div>
            )}
          </div>
          
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="nav-profile-btn" title="My Profile">
                {(() => {
                  // Check localStorage for saved profile pic first
                  let savedPic = null;
                  if (user?.uid) {
                    try {
                      const saved = JSON.parse(localStorage.getItem(`profile_${user.uid}`) || '{}');
                      savedPic = saved.profilePic;
                    } catch {}
                  }
                  const avatarSrc = savedPic || user?.photoURL;
                  
                  if (avatarSrc) {
                    return <img src={avatarSrc} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--secondary-color)' }} />;
                  }
                  
                  // Fallback: show initial letter
                  const savedName = user?.uid ? (() => { try { return JSON.parse(localStorage.getItem(`profile_${user.uid}`) || '{}').displayName; } catch { return ''; } })() : '';
                  const initial = (savedName || user?.displayName || user?.email || '?').charAt(0).toUpperCase();
                  return (
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: '#fff' }}>
                      {initial}
                    </div>
                  );
                })()}
              </Link>
              <button className="icon-btn" onClick={handleLogout} title="Logout" style={{ color: 'var(--danger-color)' }}>
                <FiLogOut />
              </button>
            </>
          ) : (
            <Link to="/auth" className="icon-btn"><FiUser /></Link>
          )}

          <button className="cart-icon icon-btn" onClick={toggleCart}>
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
