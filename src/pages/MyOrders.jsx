import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiClock, FiCheckCircle, FiChevronDown, FiChevronUp, FiCopy, FiCreditCard, FiShield, FiShoppingBag } from 'react-icons/fi';

const MyOrders = ({ user, authLoading }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/auth');
      return;
    }
    const key = `orders_${user.uid}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Sort latest first
        parsed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(parsed);
      } catch {
        setOrders([]);
      }
    }
  }, [user]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Brief visual feedback
    const btn = document.activeElement;
    if (btn) {
      const orig = btn.innerHTML;
      btn.style.color = '#10b981';
      setTimeout(() => { btn.style.color = ''; }, 1000);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getPaymentIcon = (method) => {
    const icons = {
      bkash: '💜',
      nagad: '🔴',
      rocket: '🟣'
    };
    return icons[method] || '💳';
  };

  const renderCardDetails = (order) => {
    const card = order.cardData;
    if (!card) return null;

    return (
      <div className="myorders-card-reveal">
        <div className="real-card-ui-mastercard" style={{ maxWidth: '100%', margin: '0 auto 15px' }}>
          <div className="card-network-pattern"></div>
          <div className="card-top">
            <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt="Chip" className="card-chip" />
            <div className="card-cvv">
              CVV
              <span>{card.cvv}</span>
            </div>
          </div>
          <div className="card-middle">
            <div className="card-number">
              {card.number ? card.number.match(/.{1,4}/g)?.join(' ') : 'XXXX XXXX XXXX XXXX'}
            </div>
            <button onClick={() => copyToClipboard(card.number)} className="copy-overlay" title="Copy Card Number">
              <FiCopy />
            </button>
          </div>
          <div className="card-bottom">
            <div className="card-holder">
              {card.name || (order.email ? order.email.split('@')[0].toUpperCase() : 'CUSTOMER')}
            </div>
            <div className="card-expiry-wrapper">
              <div className="card-expires-text">EXPIRES<br/>END</div>
              <div className="card-expiry">{card.expiry}</div>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="card-logo" />
          </div>
        </div>
        {card.customMessage && (
          <div className="myorders-admin-msg">
            <div dangerouslySetInnerHTML={{ __html: card.customMessage }} />
          </div>
        )}
      </div>
    );
  };

  const renderVpnDetails = (order) => {
    const vpn = order.vpnData;
    if (!vpn) return null;

    return (
      <div className="myorders-vpn-reveal">
        <div className="myorders-credential-row">
          <div>
            <span className="myorders-cred-label">Gmail / Username</span>
            <div className="myorders-cred-value">{vpn.gmail || vpn.userName}</div>
          </div>
          <button onClick={() => copyToClipboard(vpn.gmail || vpn.userName || '')} className="myorders-copy-btn" title="Copy">
            <FiCopy />
          </button>
        </div>
        <div className="myorders-credential-row">
          <div>
            <span className="myorders-cred-label">Password</span>
            <div className="myorders-cred-value">{vpn.vpnPass}</div>
          </div>
          <button onClick={() => copyToClipboard(vpn.vpnPass)} className="myorders-copy-btn" title="Copy">
            <FiCopy />
          </button>
        </div>
        {vpn.customMessage && (
          <div className="myorders-admin-msg" style={{ borderColor: 'rgba(16, 185, 129, 0.2)', background: 'rgba(16, 185, 129, 0.08)' }}>
            <div dangerouslySetInnerHTML={{ __html: vpn.customMessage }} style={{ color: '#10b981' }} />
          </div>
        )}
      </div>
    );
  };

  if (authLoading) {
    return (
      <div className="page-content" style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center', color: '#fff' }}>
          Loading orders...
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="page-content" style={{ paddingTop: '120px', minHeight: '100vh', position: 'relative' }}>

      {/* Decorative background */}
      <div style={{ position: 'absolute', top: '20%', right: '5%', width: '300px', height: '300px', background: 'var(--primary-color)', filter: 'blur(180px)', opacity: 0.15, zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '15%', left: '8%', width: '250px', height: '250px', background: 'var(--secondary-color)', filter: 'blur(150px)', opacity: 0.1, zIndex: 0 }}></div>

      <div className="container" style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px', borderRadius: '20px', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', marginBottom: '20px', boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)' }}>
            <FiShoppingBag size={30} color="#fff" />
          </div>
          <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>
            My Orders
          </h1>
          <p style={{ color: '#94a3b8' }}>
            আপনার সব orders এবং card/VPN details এখানে saved আছে
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="myorders-empty glass-panel">
            <FiPackage size={50} style={{ color: '#475569', marginBottom: '20px' }} />
            <h3 style={{ color: '#94a3b8', marginBottom: '10px' }}>No Orders Yet</h3>
            <p style={{ color: '#64748b', marginBottom: '25px' }}>আপনি এখনো কোনো order দেননি।</p>
            <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ padding: '12px 30px', borderRadius: '12px' }}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="myorders-list">
            {orders.map((order, index) => {
              const isExpanded = expandedId === (order.orderId || index);
              const isApproved = order.status === 'approved';
              const isVpn = order.type === 'vpn';

              return (
                <div key={order.orderId || index} className={`myorders-card glass-panel ${isExpanded ? 'expanded' : ''}`}>
                  {/* Order Header — clickable */}
                  <div className="myorders-card-header" onClick={() => isApproved && toggleExpand(order.orderId || index)}>
                    <div className="myorders-card-icon">
                      {isVpn ? <FiShield size={20} /> : <FiCreditCard size={20} />}
                    </div>
                    <div className="myorders-card-info">
                      <h3 className="myorders-product-name">{order.product}</h3>
                      {order.items && order.items.length > 0 && (
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px', paddingLeft: '5px', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
                          {order.items.map((it, idx) => <div key={idx}>- {it.title}</div>)}
                        </div>
                      )}
                      <div className="myorders-meta">
                        <span>{getPaymentIcon(order.paymentMethod)} {order.paymentMethod}</span>
                        <span>•</span>
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={`myorders-status ${isApproved ? 'approved' : 'pending'}`}>
                        {isApproved ? <><FiCheckCircle size={13} /> Approved</> : <><FiClock size={13} /> Pending</>}
                      </span>
                      {isApproved && (
                        <span className="myorders-expand-icon">
                          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && isApproved && (
                    <div className="myorders-details">
                      {isVpn ? renderVpnDetails(order) : renderCardDetails(order)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Order Count */}
        {orders.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '30px', color: '#64748b', fontSize: '0.9rem', paddingBottom: '40px' }}>
            Total {orders.length} order{orders.length > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
