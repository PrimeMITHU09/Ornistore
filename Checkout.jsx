import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiCheckCircle, FiShield, FiAlertTriangle, FiCopy } from 'react-icons/fi';
import { saveOrder, getOrderById } from '../utils/db';

const Checkout = ({ clearCart, user, authLoading }) => {

  // Helper: save order to localStorage for My Orders page
  const saveOrderToLocal = (orderData) => {
    if (!user?.uid) return;
    const key = `orders_${user.uid}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    // Check if order already exists (by orderId), update it
    const idx = existing.findIndex(o => o.orderId === orderData.orderId);
    if (idx >= 0) {
      existing[idx] = orderData;
    } else {
      existing.push(orderData);
    }
    localStorage.setItem(key, JSON.stringify(existing));
  };
  const [formData, setFormData] = useState({ 
    email: '', 
    paymentMethod: 'bkash',
    trxId: '',
    senderNumber: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [virtualCard, setVirtualCard] = useState(null);
  const [approvedVpnDetails, setApprovedVpnDetails] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="page-content" style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center', color: '#fff' }}>
          Loading checkout...
        </div>
      </div>
    );
  }

  if (!user) return null;

  const lockedNumber = "01864339154";
  
  const items = location.state?.items || [];
  const hasItems = items.length > 0;

  const productName = hasItems 
    ? (items.length === 1 ? items[0].title : `${items.length} Items (Cart Checkout)`)
    : (location.state?.product || "Any VPN for Mastercard");
    
  const productPrice = hasItems 
    ? `${location.state?.total?.toFixed(2)}৳`
    : "30৳";

  const handlePayment = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.trxId.length < 4) {
      setErrorMsg("Invalid TrxID! Please enter at least 4 characters.");
      return;
    }

    setIsProcessing(true);
    
    // Save to Database
    const isVpnProduct = !productName.toLowerCase().includes('mastercard') && 
                         (productName.toLowerCase().includes('vpn') || productName.toLowerCase().includes('surfshark'));
    
    const orderId = await saveOrder({
      orderType: isVpnProduct ? 'vpn' : 'card',
      email: formData.email,
      paymentMethod: formData.paymentMethod,
      senderNumber: formData.senderNumber,
      trxId: formData.trxId,
      product: productName
    });
    
    setCurrentOrderId(orderId);

    // Save pending order to localStorage immediately
    saveOrderToLocal({
      orderId,
      product: productName,
      type: isVpnProduct ? 'vpn' : 'card',
      email: formData.email,
      paymentMethod: formData.paymentMethod,
      trxId: formData.trxId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      cardData: null,
      vpnData: null,
    });

    // Open WhatsApp
    const waText = encodeURIComponent(`Hello Admin, I have made a payment for ${productName}.\n\nPayment Method: ${formData.paymentMethod}\nSender Number: ${formData.senderNumber}\nTrxID: ${formData.trxId}\nEmail: ${formData.email}\n\nPlease approve my order!`);
    window.open(`https://wa.me/8801864339154?text=${waText}`, '_blank');
  };

  // Poll for order approval
  useEffect(() => {
    if (!currentOrderId || !isProcessing) return;

    const interval = setInterval(async () => {
      const order = await getOrderById(currentOrderId);
      if (order && order.status === 'approved') {
        setIsProcessing(false);
        const vpnInfo = order.vpnDetails || (order.cardDetails && order.cardDetails.vpnDetails);
        
        if (vpnInfo) {
          setVirtualCard(null);
          setApprovedVpnDetails(vpnInfo);
          // Save approved VPN order to localStorage
          saveOrderToLocal({
            orderId: currentOrderId,
            product: order.product || productName,
            type: 'vpn',
            email: order.email || formData.email,
            paymentMethod: order.paymentMethod || formData.paymentMethod,
            trxId: order.trxId || formData.trxId,
            status: 'approved',
            createdAt: order.createdAt,
            cardData: null,
            vpnData: vpnInfo,
          });
        } else if (order.cardDetails || order.orderType === 'card') {
          setApprovedVpnDetails(null);
          
          const actualCardDetails = (order.cardDetails && order.cardDetails.cardDetails) 
            ? order.cardDetails.cardDetails 
            : order.cardDetails;
            
          if (actualCardDetails) {
            const cardObj = {
              number: actualCardDetails.number,
              cvv: actualCardDetails.cvv,
              expiry: actualCardDetails.expiry,
              customMessage: actualCardDetails.customMessage,
              name: formData.email ? formData.email.split('@')[0].toUpperCase() : 'CUSTOMER'
            };
            setVirtualCard(cardObj);
            // Save approved card order to localStorage
            saveOrderToLocal({
              orderId: currentOrderId,
              product: order.product || productName,
              type: 'card',
              email: order.email || formData.email,
              paymentMethod: order.paymentMethod || formData.paymentMethod,
              trxId: order.trxId || formData.trxId,
              status: 'approved',
              createdAt: order.createdAt,
              cardData: cardObj,
              vpnData: null,
            });
          }
        }
        
        if (clearCart) {
          clearCart();
        }
        setShowModal(true);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentOrderId, isProcessing, formData.email, clearCart]);

  return (
    <div className="checkout-page page-content" style={{ padding: '120px 0', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="checkout-wrapper" style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(15, 23, 42, 0.8)', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <FiShield style={{ fontSize: '3rem', color: 'var(--secondary-color)', marginBottom: '15px' }} />
            <h2 style={{ color: '#fff', fontSize: '2rem' }}>Secure Checkout</h2>
            <p style={{ color: '#94a3b8' }}>Complete your payment to instantly receive your virtual card.</p>
          </div>

          {errorMsg && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#fca5a5', padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FiAlertTriangle style={{ fontSize: '1.5rem', flexShrink: 0 }} />
              <p style={{ margin: 0 }}>{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="form-group">
              <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Send Money</label>
              <input type="text" readOnly value={lockedNumber} style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#0ea5e9', outline: 'none', fontWeight: 'bold', letterSpacing: '1px', cursor: 'not-allowed' }} />
            </div>
            
            <div className="form-group">
              <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Your Personal Email</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none' }} placeholder="you@example.com" />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Selected Product</label>
              <input type="text" readOnly value={`${productName} - ${productPrice}`} style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', outline: 'none', cursor: 'not-allowed' }} />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '12px' }}>Select Payment Method</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'bkash'})} style={{ padding: '15px 10px', borderRadius: '8px', border: formData.paymentMethod === 'bkash' ? '2px solid #e2136e' : '1px solid rgba(255,255,255,0.1)', background: formData.paymentMethod === 'bkash' ? 'rgba(226, 19, 110, 0.1)' : 'rgba(0,0,0,0.3)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <img src="https://freelogopng.com/images/all_img/1656234745bkash-app-logo-png.png" alt="bKash" style={{ height: '30px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '0.85rem' }}>bKash</span>
                </button>
                <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'nagad'})} style={{ padding: '15px 10px', borderRadius: '8px', border: formData.paymentMethod === 'nagad' ? '2px solid #ed1c24' : '1px solid rgba(255,255,255,0.1)', background: formData.paymentMethod === 'nagad' ? 'rgba(237, 28, 36, 0.1)' : 'rgba(0,0,0,0.3)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <img src="https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png" alt="Nagad" style={{ height: '30px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '0.85rem' }}>Nagad</span>
                </button>
                <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'rocket'})} style={{ padding: '15px 10px', borderRadius: '8px', border: formData.paymentMethod === 'rocket' ? '2px solid #8c1596' : '1px solid rgba(255,255,255,0.1)', background: formData.paymentMethod === 'rocket' ? 'rgba(140, 21, 150, 0.1)' : 'rgba(0,0,0,0.3)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <img src="/rocket_logo.png" alt="Rocket" style={{ height: '30px', width: '30px', objectFit: 'contain', borderRadius: '50%' }} />
                  <span style={{ fontSize: '0.85rem' }}>Rocket</span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Sender Number (যে নাম্বার থেকে টাকা পাঠিয়েছেন)</label>
              <input type="text" required value={formData.senderNumber} onChange={(e) => setFormData({...formData, senderNumber: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', letterSpacing: '1px' }} placeholder="Enter sender number (e.g. 017...)" />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Transaction ID (TrxID)</label>
              <input type="text" required value={formData.trxId} onChange={(e) => setFormData({...formData, trxId: e.target.value.toUpperCase()})} style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', letterSpacing: '1px' }} placeholder="Enter TrxID here..." />
              <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}><FiAlertTriangle /> Warning: If TrxID is wrong, money cannot be refunded!</p>
            </div>

            <div style={{ marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Total Pay:</span>
              <span style={{ color: 'var(--secondary-color)' }}>{productPrice}</span>
            </div>

            <button type="submit" disabled={isProcessing} className="btn btn-primary" style={{ padding: '15px', fontSize: '1.1rem', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {isProcessing ? <><div className="spinner" style={{ marginRight: '10px' }}></div> Waiting for Admin Approval...</> : "Verify Payment"}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal for Virtual Card */}
      {showModal && virtualCard && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.5s ease-out' }}>
          <div className="modal-content" style={{ background: 'var(--bg-color)', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '500px', width: '90%', textAlign: 'center', position: 'relative', animation: 'scaleUp 0.5s ease-out' }}>
            <FiCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '20px' }} />
            <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '10px' }}>Payment Verified!</h2>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Your premium virtual card has been instantly generated and is ready to use.</p>
            
            <div className="real-card-ui-mastercard">
              <div className="card-network-pattern"></div>
              
              <div className="card-top">
                <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt="Chip" className="card-chip" />
                <div className="card-cvv">
                  CVV
                  <span>{virtualCard.cvv}</span>
                </div>
              </div>
              
              <div className="card-middle">
                <div className="card-number">
                  {virtualCard.number ? virtualCard.number.match(/.{1,4}/g)?.join(' ') : 'XXXX XXXX XXXX XXXX'}
                </div>
                <button onClick={() => { navigator.clipboard.writeText(virtualCard.number); alert('Card Number Copied!'); }} className="copy-overlay" title="Copy Card Number">
                  <FiCopy />
                </button>
              </div>
              
              <div className="card-bottom">
                <div className="card-holder">
                  {virtualCard.name}
                </div>
                <div className="card-expiry-wrapper">
                  <div className="card-expires-text">EXPIRES<br/>END</div>
                  <div className="card-expiry">{virtualCard.expiry}</div>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="card-logo" />
              </div>
            </div>

            {virtualCard.customMessage && (
              <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '10px', border: '1px solid rgba(14, 165, 233, 0.2)', textAlign: 'left' }}>
                <div dangerouslySetInnerHTML={{ __html: `"${virtualCard.customMessage}"` }} style={{ color: '#0ea5e9', fontStyle: 'italic', fontSize: '1rem' }} />
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '5px' }}>- Admin</div>
              </div>
            )}

            <button onClick={() => navigate('/')} className="btn btn-outline" style={{ marginTop: '30px', width: '100%' }}>Return to Home</button>
          </div>
        </div>
      )}

      {/* Success Modal for VPN */}
      {showModal && approvedVpnDetails && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.5s ease-out' }}>
          <div className="modal-content" style={{ background: 'var(--bg-color)', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '500px', width: '90%', textAlign: 'center', position: 'relative', animation: 'scaleUp 0.5s ease-out' }}>
            <FiCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '20px' }} />
            <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '10px' }}>VPN Account Ready!</h2>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Your premium VPN credentials have been generated successfully.</p>
            
            <div className="virtual-card-reveal" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', textAlign: 'left', position: 'relative', overflow: 'hidden', marginTop: '20px' }}>
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: '#10b981', filter: 'blur(80px)', opacity: 0.2 }}></div>
              
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Gmail / Username</span>
                  <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>{approvedVpnDetails.gmail || approvedVpnDetails.userName}</div>
                </div>
                <button onClick={() => { navigator.clipboard.writeText(approvedVpnDetails.gmail || approvedVpnDetails.userName || ""); alert('Copied!'); }} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Copy">
                  <FiCopy />
                </button>
              </div>

              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Password</span>
                  <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>{approvedVpnDetails.vpnPass}</div>
                </div>
                <button onClick={() => { navigator.clipboard.writeText(approvedVpnDetails.vpnPass); alert('Copied!'); }} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Copy">
                  <FiCopy />
                </button>
              </div>

              {approvedVpnDetails.customMessage && (
                <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div dangerouslySetInnerHTML={{ __html: `"${approvedVpnDetails.customMessage}"` }} style={{ color: '#10b981', fontStyle: 'italic', fontSize: '1rem' }} />
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '5px' }}>- Admin</div>
                </div>
              )}
            </div>

            <button onClick={() => navigate('/')} className="btn btn-outline" style={{ marginTop: '30px', width: '100%', padding: '12px' }}>Return to Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
