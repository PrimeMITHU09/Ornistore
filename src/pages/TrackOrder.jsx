import React, { useState } from 'react';
import { getOrders } from '../utils/db';
import { FiSearch, FiCopy } from 'react-icons/fi';

const TrackOrder = () => {
  const [trxId, setTrxId] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trxId.trim()) return;
    
    setLoading(true);
    setError('');
    setOrderResult(null);

    const orders = await getOrders();
    const foundOrder = orders.find(o => o.trxId.toLowerCase() === trxId.trim().toLowerCase());

    if (foundOrder) {
      setOrderResult(foundOrder);
    } else {
      setError('No order found with this Transaction ID. Please check and try again.');
    }
    setLoading(false);
  };

  const renderOrderDetails = () => {
    if (!orderResult) return null;

    if (orderResult.status === 'pending') {
      return (
        <div style={{ padding: '30px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '15px', color: '#f59e0b', textAlign: 'center' }}>
          <h3>Order is Pending! ⏳</h3>
          <p>Your order is currently being reviewed by our admins. Please check back later.</p>
        </div>
      );
    }

    if (orderResult.status === 'approved') {
      const isVpnOrder = orderResult.orderType === 'vpn' || (orderResult.product && (orderResult.product.toLowerCase().includes('vpn') || orderResult.product.toLowerCase().includes('surfshark')));
      
      if (isVpnOrder && orderResult.vpnDetails) {
        return (
          <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <h3 style={{ color: '#10b981', marginBottom: '20px', textAlign: 'center' }}>✅ Order Approved! Your VPN Details:</h3>
            
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Gmail / Username</span>
                <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>{orderResult.vpnDetails.gmail || orderResult.vpnDetails.userName}</div>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(orderResult.vpnDetails.gmail || orderResult.vpnDetails.userName || ""); alert('Copied!'); }} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '5px', cursor: 'pointer' }} title="Copy">
                <FiCopy />
              </button>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Password</span>
                <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>{orderResult.vpnDetails.vpnPass}</div>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(orderResult.vpnDetails.vpnPass); alert('Copied!'); }} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '5px', cursor: 'pointer' }} title="Copy">
                <FiCopy />
              </button>
            </div>

            {orderResult.vpnDetails.customMessage && (
              <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div dangerouslySetInnerHTML={{ __html: `"${orderResult.vpnDetails.customMessage}"` }} style={{ color: '#10b981', fontStyle: 'italic', fontSize: '1rem' }} />
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '5px' }}>- Admin</div>
              </div>
            )}
          </div>
        );
      } else if (orderResult.cardDetails || orderResult.orderType === 'card') {
        const actualCardDetails = (orderResult.cardDetails && orderResult.cardDetails.cardDetails) 
            ? orderResult.cardDetails.cardDetails 
            : orderResult.cardDetails;
            
        if (!actualCardDetails) return null;

        return (
          <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
            <h3 style={{ color: '#0ea5e9', marginBottom: '20px', textAlign: 'center' }}>✅ Order Approved! Your Virtual Card:</h3>
            
            <div className="real-card-ui-mastercard">
              <div className="card-network-pattern"></div>
              
              <div className="card-top">
                <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt="Chip" className="card-chip" />
                <div className="card-cvv">
                  CVV
                  <span>{actualCardDetails.cvv}</span>
                </div>
              </div>
              
              <div className="card-middle">
                <div className="card-number">
                  {actualCardDetails.number ? actualCardDetails.number.match(/.{1,4}/g)?.join(' ') : 'XXXX XXXX XXXX XXXX'}
                </div>
                <button onClick={() => { navigator.clipboard.writeText(actualCardDetails.number); alert('Card Number Copied!'); }} className="copy-overlay" title="Copy Card Number">
                  <FiCopy />
                </button>
              </div>
              
              <div className="card-bottom">
                <div className="card-holder">
                  {(orderResult.email ? orderResult.email.split('@')[0] : 'Customer').toUpperCase()}
                </div>
                <div className="card-expiry-wrapper">
                  <div className="card-expires-text">EXPIRES<br/>END</div>
                  <div className="card-expiry">{actualCardDetails.expiry}</div>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="card-logo" />
              </div>
            </div>

            {actualCardDetails.customMessage && (
              <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '10px', border: '1px solid rgba(14, 165, 233, 0.2)', textAlign: 'left' }}>
                <div dangerouslySetInnerHTML={{ __html: `"${actualCardDetails.customMessage}"` }} style={{ color: '#0ea5e9', fontStyle: 'italic', fontSize: '1rem' }} />
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '5px' }}>- Admin</div>
              </div>
            )}
          </div>
        );
      }
    }

    return null;
  };

  return (
    <div className="page-content" style={{ padding: '120px 0', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '30px' }}>Track Your Order</h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '30px' }}>
          Enter your Transaction ID (TrxID) below to check the status of your order or retrieve your credentials.
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '40px' }}>
          <input 
            type="text" 
            placeholder="Enter TrxID..." 
            value={trxId} 
            onChange={(e) => setTrxId(e.target.value)} 
            style={{ flex: 1, padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontSize: '1.1rem' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '15px 30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiSearch /> {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {error && <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: '20px', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>{error}</div>}

        {renderOrderDetails()}
      </div>
    </div>
  );
};

export default TrackOrder;
