import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaPlay, FaShieldAlt, FaTools, FaUserCheck, FaCreditCard, FaLock } from 'react-icons/fa';
import { FiCheckCircle, FiCopy, FiEye, FiEyeOff } from 'react-icons/fi';
import { saveOrder, getOrderById, updateOrder } from '../utils/db';

const Categories = () => {
  const [selectedVpn, setSelectedVpn] = useState('NordVPN');
  const [isCustomVpn, setIsCustomVpn] = useState(false);
  const [customVpnName, setCustomVpnName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [showYoutubePendingModal, setShowYoutubePendingModal] = useState(false);
  const [twoFaCode, setTwoFaCode] = useState('');
  const [formData, setFormData] = useState({
    paymentMethod: 'bkash',
    trxId: '',
    senderNumber: '',
    vpnDuration: '7days'
  });
  const [youtubeFormData, setYoutubeFormData] = useState({
    paymentMethod: 'bkash',
    trxId: '',
    senderNumber: '',
    duration: '1month',
    gmail: '',
    password: '',
    hasTrial: false
  });
  const [showYoutubePassword, setShowYoutubePassword] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [approvedVpnDetails, setApprovedVpnDetails] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const lockedNumber = "01864339154";

  const vpnList = [
    "NordVPN", "ExpressVPN", "Surfshark", "CyberGhost", "ProtonVPN", "Private Internet Access (PIA)", 
    "Mullvad VPN", "Windscribe", "Hide.me", "TunnelBear", "VyprVPN", "Hotspot Shield", 
    "IPVanish", "ZenMate", "PureVPN", "Ivacy VPN", "StrongVPN", "Astrill VPN", 
    "AdGuard VPN", "Mozilla VPN", "Google One VPN", "Norton Secure VPN", "McAfee Safe Connect", 
    "Avast SecureLine", "Kaspersky VPN", "Bitdefender Premium VPN", "Hola VPN", "Turbo VPN", 
    "VPN Proxy Master", "SuperVPN", "Betternet", "KeepSolid VPN Unlimited", "Atlas VPN", 
    "PrivateVPN", "Trust.Zone", "CactusVPN", "HideMyAss (HMA)", "FastestVPN", "TorGuard", "SlickVPN"
  ];

  const [pendingOrderData, setPendingOrderData] = useState(null);

  // Poll for order approval and real-time updates
  useEffect(() => {
    if (!currentOrderId || !isProcessing) return;

    const interval = setInterval(async () => {
      const order = await getOrderById(currentOrderId);
      if (order) {
        setPendingOrderData(order);
        if (order.status === 'approved') {
          clearInterval(interval);
          setIsProcessing(false);
          const vpnInfo = order.vpnDetails || (order.cardDetails && order.cardDetails.vpnDetails) || { customMessage: order.customMessage };
          setApprovedVpnDetails(vpnInfo);
          setShowSuccessModal(true);
          setShowYoutubePendingModal(false);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentOrderId, isProcessing]);

  return (
    <div className="page-content" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="categories-section" style={{ padding: '40px 0', position: 'relative' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="section-title" style={{ fontSize: '3rem', background: 'linear-gradient(135deg, #38bdf8, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}>আমাদের সার্ভিস ক্যাটাগরি</h2>
            <p className="section-subtitle" style={{ color: '#cbd5e1', fontSize: '1.2rem', marginTop: '10px' }}>আপনার প্রয়োজনীয় সব ডিজিটাল সার্ভিস এক জায়গায়</p>
          </div>
          
          <div className="categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
            {/* Cat 1 */}
            <div className="category-card glass-panel" style={{ padding: '40px 20px', borderRadius: '20px', textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.2)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';}}>
              <FaGamepad style={{ fontSize: '4rem', color: '#f59e0b', marginBottom: '20px' }} />
              <h4 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '10px' }}>গেমিং ও টপ-আপ</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.4' }}>যেকোনো গেমের টপ-আপ (Any Games)</p>
            </div>
            
            {/* Cat 2 */}
            <div className="category-card glass-panel" style={{ padding: '40px 20px', borderRadius: '20px', textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(239, 68, 68, 0.2)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';}}>
              <FaPlay style={{ fontSize: '4rem', color: '#ef4444', marginBottom: '20px' }} />
              <h4 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '10px' }}>স্ট্রিমিং সার্ভিস</h4>
              <p style={{ color: '#94a3b8', fontSize: '1rem', fontStyle: 'italic', opacity: 0.7 }}>Upcoming...</p>
            </div>

            {/* Cat 3 */}
            <div className="category-card glass-panel" style={{ padding: '40px 20px', borderRadius: '20px', textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.2)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';}}>
              <FaShieldAlt style={{ fontSize: '4rem', color: '#10b981', marginBottom: '20px' }} />
              <h4 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '10px' }}>ভিপিএন ও সিকিউরিটি</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.4' }}>যেকোনো ভিপিএন কেনা যাবে<br/><small>(অবশ্যই ট্রায়াল অপশন থাকতে হবে)</small></p>
            </div>

            {/* Cat 4 */}
            <div className="category-card glass-panel" style={{ padding: '40px 20px', borderRadius: '20px', textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = '#38bdf8'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(56, 189, 248, 0.2)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';}}>
              <FaTools style={{ fontSize: '4rem', color: '#38bdf8', marginBottom: '20px' }} />
              <h4 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '10px' }}>প্রিমিয়াম টুলস</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.4' }}>Canva, ChatGPT, Gemini, Google One, Office 365</p>
            </div>

            {/* Cat 5 */}
            <div className="category-card glass-panel" style={{ padding: '40px 20px', borderRadius: '20px', textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = '#3b5998'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 89, 152, 0.2)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';}}>
              <FaUserCheck style={{ fontSize: '4rem', color: '#3b5998', marginBottom: '20px' }} />
              <h4 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '10px' }}>সোশ্যাল মিডিয়া</h4>
              <p style={{ color: '#94a3b8', fontSize: '1rem' }}>FB Badge, TG Premium</p>
            </div>

            {/* Cat 6 */}
            <div className="category-card glass-panel" style={{ padding: '40px 20px', borderRadius: '20px', textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.2)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';}}>
              <FaCreditCard style={{ fontSize: '4rem', color: '#8b5cf6', marginBottom: '20px' }} />
              <h4 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '10px' }}>ভার্চুয়াল কার্ড (VCC)</h4>
              <div style={{ minHeight: '1.5rem' }}>
                <Link to="/products" className="btn btn-primary" style={{ display: 'inline-block', padding: '8px 25px', fontSize: '1rem', borderRadius: '30px', background: 'linear-gradient(135deg, #8b5cf6, #c026d3)', border: 'none' }}>Buy Card</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VPN Showcase Section */}
      <section className="vpn-showcase" style={{ padding: '20px 0 80px', position: 'relative' }}>
        <div className="container">
          <div className="vpn-banner" style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)', 
            border: '1px solid rgba(16, 185, 129, 0.2)', 
            borderRadius: '24px', 
            padding: '50px 30px', 
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '25px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <FaShieldAlt style={{ fontSize: '2.5rem', color: '#10b981' }} />
            </div>
            
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '15px' }}>Premium VPN Store</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', marginBottom: '30px', lineHeight: '1.6' }}>
              কার্ড ছাড়াও আমাদের কাছে বিশ্বের যেকোনো প্রিমিয়াম ভিপিএন অ্যাভেইলএবল আছে। নিচে থেকে আপনার পছন্দের ভিপিএনটি সিলেক্ট করে সরাসরি অর্ডার করুন!
              <br/><br/>
              <span style={{ color: '#f59e0b', fontSize: '0.95rem', display: 'block', background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                ⚠️ <strong>নোট:</strong> আমাদের কাছে মূলত যেসব ভিপিএনে "ট্রায়াল অপশন" আছে, সেগুলোই পাবেন। ফুল পেইড (Paid) ভিপিএন নিতে চাইলে অবশ্যই অ্যাডমিনের সাথে যোগাযোগ করুন।
              </span>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%', maxWidth: '500px' }}>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
                className="animated-pulse" 
                style={{ 
                  width: '100%', 
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', 
                  color: '#fff', 
                  padding: '15px 40px', 
                  fontSize: '1.3rem', 
                  borderRadius: '50px', 
                  border: '2px solid rgba(255,255,255,0.2)', 
                  cursor: 'pointer', 
                  fontWeight: 'bold', 
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.7)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.5)'; }}
              >
                Buy VPN
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Premium Showcase */}
      <section className="youtube-showcase" style={{ padding: '20px 0 80px', position: 'relative' }}>
        <div className="container">
          <div className="youtube-banner" style={{ 
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%)', 
            border: '1px solid rgba(239, 68, 68, 0.2)', 
            borderRadius: '24px', 
            padding: '50px 30px', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '25px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <FaPlay style={{ fontSize: '2.5rem', color: '#ef4444' }} />
            </div>
            
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '15px' }}>YouTube Premium Store</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', marginBottom: '30px', lineHeight: '1.6' }}>
              আমাদের মাধ্যমে খুব সহজেই আপনার ব্যক্তিগত জিমেইলে ইউটিউব প্রিমিয়াম সাবস্ক্রিপশন নিতে পারবেন। নিচে থেকে সরাসরি অর্ডার করুন!
              <br/><br/>
              <span style={{ color: '#f59e0b', fontSize: '0.95rem', display: 'block', background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                ⚠️ <strong>নোট:</strong> আপনার ইউটিউব অ্যাপে যদি "০ টাকায় ইউটিউব প্রিমিয়াম" (1 Month Free Trial) অফারটি এভেইলএবল দেখায়, শুধুমাত্র তখনই Buy-এ ক্লিক করে অর্ডার করবেন।
              </span>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%', maxWidth: '500px' }}>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setShowYoutubeModal(true);
                }}
                className="animated-pulse" 
                style={{ 
                  width: '100%', 
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)', 
                  color: '#fff', 
                  padding: '15px 40px', 
                  fontSize: '1.3rem', 
                  borderRadius: '50px', 
                  border: '2px solid rgba(255,255,255,0.2)', 
                  cursor: 'pointer', 
                  fontWeight: 'bold', 
                  boxShadow: '0 10px 30px rgba(239, 68, 68, 0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(239, 68, 68, 0.7)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(239, 68, 68, 0.5)'; }}
              >
                Buy YouTube Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VPN Checkout Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.95)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '15px', right: '20px', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>✖</button>
            <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '20px', textAlign: 'center' }}>VPN Secure Checkout</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Select VPN</label>
                <div style={{ width: '100%', position: 'relative' }}>
                  <select 
                    value={selectedVpn} 
                    onChange={(e) => setSelectedVpn(e.target.value)}
                    disabled={isCustomVpn}
                    style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', outline: 'none', appearance: 'none', cursor: isCustomVpn ? 'not-allowed' : 'pointer', opacity: isCustomVpn ? 0.5 : 1 }}
                  >
                    {vpnList.map(vpn => (
                      <option key={vpn} value={vpn} style={{ background: '#0f172a', color: '#fff' }}>{vpn}</option>
                    ))}
                  </select>
                  <div style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#cbd5e1' }}>▼</div>
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input 
                  type="checkbox" 
                  checked={isCustomVpn} 
                  onChange={(e) => setIsCustomVpn(e.target.checked)} 
                  style={{ width: '16px', height: '16px', accentColor: '#10b981', cursor: 'pointer' }}
                />
                আমি লিস্টের বাইরের অন্য কোনো ভিপিএন নিতে চাই
              </label>

              {isCustomVpn && (
                <div className="form-group">
                  <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Custom VPN Name (Must have trial)</label>
                  <input 
                    type="text" 
                    placeholder="Enter VPN name..." 
                    value={customVpnName}
                    onChange={(e) => setCustomVpnName(e.target.value)}
                    style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', outline: 'none' }}
                  />
                </div>
              )}

              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Select Trial Duration (Cost)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <label style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${formData.vpnDuration === '3days' ? '#10b981' : 'rgba(255,255,255,0.1)'}`, background: formData.vpnDuration === '3days' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)', color: '#fff', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                    <input 
                      type="radio" 
                      name="vpnDuration" 
                      value="3days" 
                      checked={formData.vpnDuration === '3days'}
                      onChange={(e) => setFormData({...formData, vpnDuration: e.target.value})}
                      style={{ display: 'none' }} 
                    />
                    <span style={{ fontWeight: 'bold' }}>3 Days - 20৳</span>
                  </label>
                  <label style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${formData.vpnDuration === '7days' ? '#10b981' : 'rgba(255,255,255,0.1)'}`, background: formData.vpnDuration === '7days' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)', color: '#fff', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                    <input 
                      type="radio" 
                      name="vpnDuration" 
                      value="7days" 
                      checked={formData.vpnDuration === '7days'}
                      onChange={(e) => setFormData({...formData, vpnDuration: e.target.value})}
                      style={{ display: 'none' }} 
                    />
                    <span style={{ fontWeight: 'bold' }}>7 Days - 40৳</span>
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Payment Method</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['bkash', 'nagad', 'rocket'].map((method) => (
                    <label key={method} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${formData.paymentMethod === method ? '#10b981' : 'rgba(255,255,255,0.1)'}`, background: formData.paymentMethod === method ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)', color: '#fff', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value={method} 
                        checked={formData.paymentMethod === method}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        style={{ display: 'none' }} 
                      />
                      <span style={{ textTransform: 'capitalize' }}>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Send Money To</label>
                <input type="text" readOnly value={lockedNumber} style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#0ea5e9', outline: 'none', fontWeight: 'bold', cursor: 'not-allowed' }} />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Sender Number (যে নাম্বার থেকে টাকা পাঠিয়েছেন)</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 017XXXXX"
                  value={formData.senderNumber}
                  onChange={(e) => setFormData({...formData, senderNumber: e.target.value})}
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} 
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Transaction ID (TrxID)</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 8JD7U2X"
                  value={formData.trxId}
                  onChange={(e) => setFormData({...formData, trxId: e.target.value})}
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none', textTransform: 'uppercase' }} 
                />
              </div>

              <button 
                disabled={isProcessing}
                onClick={async () => {
                  const finalVpnName = isCustomVpn ? customVpnName : selectedVpn;
                  if (isCustomVpn && !customVpnName.trim()) {
                    alert('দয়া করে ভিপিএনের নাম লিখুন!');
                    return;
                  }
                  if (!formData.senderNumber || !formData.trxId) {
                    alert('দয়া করে সেন্ডার নাম্বার এবং TrxID প্রদান করুন!');
                    return;
                  }
                  
                  setIsProcessing(true);
                  const price = formData.vpnDuration === '3days' ? '20৳' : '40৳';
                  const durationLabel = formData.vpnDuration === '3days' ? '3 Days' : '7 Days';
                  
                  const orderId = await saveOrder({
                    orderType: 'vpn',
                    email: 'N/A', // user might not provide email for VPN initially
                    product: finalVpnName,
                    duration: durationLabel,
                    price: price,
                    paymentMethod: formData.paymentMethod,
                    senderNumber: formData.senderNumber,
                    trxId: formData.trxId
                  });
                  
                  setCurrentOrderId(orderId);

                  const waText = encodeURIComponent(`Hello Admin, I have made a payment for VPN.\n\nVPN Name: ${finalVpnName}\nDuration: ${durationLabel}\nPrice: ${price}\nPayment Method: ${formData.paymentMethod}\nSender Number: ${formData.senderNumber}\nTrxID: ${formData.trxId}\n\nPlease process my VPN order!`);
                  window.open(`https://wa.me/8801864339154?text=${waText}`, '_blank');
                  // We do NOT close the modal immediately so user can see processing state, or we can close it and let the success modal pop up.
                  // Let's close the order modal, and let the success modal pop up separately when approved.
                  setShowModal(false);
                }}
                className="animated-pulse" 
                style={{ width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', padding: '15px', fontSize: '1.2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
              >
                {isProcessing ? <><div className="spinner" style={{ marginRight: '10px', display: 'inline-block', width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderRadius: '50%', borderTopColor: '#fff', animation: 'spin 1s ease-in-out infinite' }}></div> Processing...</> : "Confirm VPN Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Checkout Modal */}
      {showYoutubeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.95)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', position: 'relative' }}>
            <button onClick={() => setShowYoutubeModal(false)} style={{ position: 'absolute', top: '15px', right: '20px', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>✖</button>
            <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '20px', textAlign: 'center' }}>YouTube Secure Checkout</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Select YouTube Plan</label>
                <div style={{ width: '100%', position: 'relative' }}>
                  <select 
                    value="YouTube Premium"
                    readOnly
                    style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', outline: 'none', appearance: 'none', cursor: 'default' }}
                  >
                    <option value="YouTube Premium" style={{ background: '#0f172a', color: '#fff' }}>YouTube Premium</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Select Duration (Cost)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <label style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${youtubeFormData.duration === '1month' ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, background: youtubeFormData.duration === '1month' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)', color: '#fff', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                    <input 
                      type="radio" 
                      name="ytDuration" 
                      value="1month" 
                      checked={youtubeFormData.duration === '1month'}
                      onChange={(e) => setYoutubeFormData({...youtubeFormData, duration: e.target.value})}
                      style={{ display: 'none' }} 
                    />
                    <span style={{ fontWeight: 'bold' }}>1 Month - 35৳</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Gmail Account</label>
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your Gmail address"
                  value={youtubeFormData.gmail}
                  onChange={(e) => setYoutubeFormData({...youtubeFormData, gmail: e.target.value})}
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} 
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', cursor: 'pointer', fontSize: '0.9rem', marginTop: '-5px', marginBottom: '5px' }}>
                <input 
                  type="checkbox" 
                  checked={youtubeFormData.hasTrial} 
                  onChange={(e) => setYoutubeFormData({...youtubeFormData, hasTrial: e.target.checked})} 
                  style={{ width: '16px', height: '16px', accentColor: '#ef4444', cursor: 'pointer' }}
                />
                এই জিমেইলে পূর্বে কখনো ইউটিউব প্রিমিয়াম ট্রায়াল নেওয়া হয়নি
              </label>

              <div className="form-group" style={{ position: 'relative' }}>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Gmail Password</label>
                <input 
                  type={showYoutubePassword ? "text" : "password"} 
                  required 
                  placeholder="Enter your Gmail password"
                  value={youtubeFormData.password}
                  onChange={(e) => setYoutubeFormData({...youtubeFormData, password: e.target.value})}
                  style={{ width: '100%', padding: '12px 15px', paddingRight: '45px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} 
                />
                <button 
                  type="button"
                  onClick={() => setShowYoutubePassword(!showYoutubePassword)}
                  style={{ position: 'absolute', right: '10px', top: '38px', background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  {showYoutubePassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '5px' }}>
                <p style={{ color: '#fca5a5', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                  <strong>⚠️ গুরুত্বপূর্ণ:</strong> দয়া করে আপনার জিমেইলের <strong>2-Step Verification (2FA)</strong> অন করে রাখুন এবং একটি ব্যাকআপ কোড বা ফোন ভেরিফিকেশন প্রস্তুত রাখুন, যাতে অ্যাডমিন লগইন করার সময় কোড দিতে পারেন।
                </p>
              </div>
              
              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Payment Method</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['bkash', 'nagad', 'rocket'].map((method) => (
                    <label key={method} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${youtubeFormData.paymentMethod === method ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, background: youtubeFormData.paymentMethod === method ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)', color: '#fff', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                      <input 
                        type="radio" 
                        name="ytPaymentMethod" 
                        value={method} 
                        checked={youtubeFormData.paymentMethod === method}
                        onChange={(e) => setYoutubeFormData({...youtubeFormData, paymentMethod: e.target.value})}
                        style={{ display: 'none' }} 
                      />
                      <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Send Money To</label>
                <input type="text" readOnly value={lockedNumber} style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#0ea5e9', outline: 'none', fontWeight: 'bold', cursor: 'not-allowed' }} />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Sender Number (যে নাম্বার থেকে টাকা পাঠিয়েছেন)</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 017XXXXX"
                  value={youtubeFormData.senderNumber}
                  onChange={(e) => setYoutubeFormData({...youtubeFormData, senderNumber: e.target.value})}
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} 
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px' }}>Transaction ID (TrxID)</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 8G7A6B5C"
                  value={youtubeFormData.trxId}
                  onChange={(e) => setYoutubeFormData({...youtubeFormData, trxId: e.target.value.toUpperCase()})}
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} 
                />
              </div>

              <button 
                onClick={async () => {
                  if (!youtubeFormData.gmail || !youtubeFormData.password) {
                    alert('দয়া করে আপনার জিমেইল এবং পাসওয়ার্ড প্রদান করুন!');
                    return;
                  }
                  if (!youtubeFormData.hasTrial) {
                    alert('দয়া করে চেক বক্সে ক্লিক করে নিশ্চিত করুন যে আপনার জিমেইলে ট্রায়াল অ্যাভেইলএবল আছে!');
                    return;
                  }
                  if (!youtubeFormData.senderNumber || !youtubeFormData.trxId) {
                    alert('দয়া করে সেন্ডার নাম্বার এবং TrxID প্রদান করুন!');
                    return;
                  }
                  
                  setIsProcessing(true);
                  const price = '35৳';
                  const durationLabel = '1 Month';
                  
                  const orderId = await saveOrder({
                    orderType: 'vpn', // Keeping it 'vpn' so admin panel uses the same generator box
                    email: youtubeFormData.gmail, // Store gmail directly in the root email field
                    product: 'YouTube Premium',
                    duration: durationLabel,
                    price: price,
                    paymentMethod: youtubeFormData.paymentMethod,
                    senderNumber: youtubeFormData.senderNumber,
                    trxId: youtubeFormData.trxId,
                    // Store password securely (in real app, this should be encrypted, but for this project we follow the pattern)
                    youtubePassword: youtubeFormData.password
                  });
                  
                  setCurrentOrderId(orderId);

                  const waText = encodeURIComponent(`Hello Admin, I have made a payment for YouTube Premium.\n\nProduct: YouTube Premium\nDuration: ${durationLabel}\nPrice: ${price}\nGmail: ${youtubeFormData.gmail}\nPassword: ${youtubeFormData.password}\nPayment Method: ${youtubeFormData.paymentMethod}\nSender Number: ${youtubeFormData.senderNumber}\nTrxID: ${youtubeFormData.trxId}\n\nPlease process my order!`);
                  window.open(`https://wa.me/8801864339154?text=${waText}`, '_blank');
                  setShowYoutubeModal(false);
                  setShowYoutubePendingModal(true);
                }}
                className="animated-pulse" 
                style={{ width: '100%', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff', padding: '15px', fontSize: '1.2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
              >
                {isProcessing ? <><div className="spinner" style={{ marginRight: '10px', display: 'inline-block', width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderRadius: '50%', borderTopColor: '#fff', animation: 'spin 1s ease-in-out infinite' }}></div> Processing...</> : "Confirm YouTube Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Pending & 2FA Modal */}
      {showYoutubePendingModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.95)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', width: '90%', maxWidth: '500px', textAlign: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', position: 'relative' }}>
            
            <div className="spinner" style={{ margin: '0 auto 20px auto', width: '50px', height: '50px', border: '4px solid rgba(239,68,68,0.2)', borderRadius: '50%', borderTopColor: '#ef4444', animation: 'spin 1s ease-in-out infinite' }}></div>
            
            <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '15px' }}>অর্ডার প্রসেসিং হচ্ছে...</h3>
            
            {pendingOrderData?.loginStatus === 'done' ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '15px', borderRadius: '10px', marginBottom: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <h4 style={{ color: '#10b981', margin: '0 0 10px 0', fontSize: '1.2rem' }}>✅ Login Successful!</h4>
                <p style={{ color: '#cbd5e1', margin: 0 }}>অ্যাডমিন আপনার একাউন্টে সফলভাবে লগইন করেছে। দয়া করে অপেক্ষা করুন, আপনার প্রিমিয়াম এক্টিভেশন কিছুক্ষণের মধ্যেই সম্পন্ন হবে।</p>
              </div>
            ) : (
              <>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  অ্যাডমিন আপনার একাউন্টে লগইন করে ১ ঘন্টার মধ্যে ইউটিউব প্রিমিয়াম এক্টিভেট করে দিবে। দয়া করে অপেক্ষা করুন।
                </p>

                {pendingOrderData?.adminInstruction && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '15px', borderRadius: '10px', marginBottom: '20px', border: '1px solid rgba(239, 68, 68, 0.3)', animation: 'pulse 2s infinite' }}>
                    <strong style={{ color: '#ef4444', display: 'block', marginBottom: '10px' }}>⚠️ Admin Message:</strong>
                    <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', display: 'block', marginBottom: '15px' }}>{pendingOrderData.adminInstruction}</span>
                    <button 
                      onClick={async () => {
                         await updateOrder(currentOrderId, { userConfirmedInstruction: true });
                         alert('অ্যাডমিনকে জানানো হয়েছে!');
                      }}
                      className="animated-pulse"
                      style={{ padding: '10px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Done (কাজটি করেছি)
                    </button>
                  </div>
                )}

                {pendingOrderData?.askForCode && (
                  <div style={{ marginTop: '10px' }}>
                    <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '10px' }}>
                      গুগল লগইন করার সময় <strong>2-Step Verification Code (2FA)</strong> বা সিকিউরিটি কোড চাচ্ছে। দয়া করে আপনার জিমেইল/ফোন চেক করে নিচের বক্সে কোডটি প্রদান করুন।
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type="text" 
                        placeholder="Enter 2FA Code or Security Code" 
                        value={twoFaCode}
                        onChange={(e) => setTwoFaCode(e.target.value)}
                        style={{ flex: 1, padding: '12px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none', fontSize: '1.1rem', letterSpacing: '2px', textAlign: 'center' }} 
                      />
                      <button 
                        onClick={async () => {
                          if (!twoFaCode) {
                            alert('দয়া করে কোড দিন!');
                            return;
                          }
                          await updateOrder(currentOrderId, { twoFaCode });
                          const waText = encodeURIComponent(`Hello Admin, here is my 2FA Code for YouTube Premium.\n\nCode: ${twoFaCode}\nOrder ID: ${currentOrderId}\nGmail: ${youtubeFormData.gmail}`);
                          window.open(`https://wa.me/8801864339154?text=${waText}`, '_blank');
                          alert('আপনার কোড অ্যাডমিনের কাছে পাঠানো হয়েছে! অনুগ্রহ করে অপেক্ষা করুন।');
                          setTwoFaCode('');
                        }}
                        className="animated-pulse"
                        style={{ background: '#ef4444', color: '#fff', padding: '0 25px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && approvedVpnDetails && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.5s ease-out', padding: '20px' }}>
          <div className="modal-content" style={{ background: 'var(--bg-color)', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '500px', width: '100%', textAlign: 'center', position: 'relative', animation: 'scaleUp 0.5s ease-out', maxHeight: '90vh', overflowY: 'auto' }}>
            
            {/* Dynamic Icon & Title */}
            {pendingOrderData?.product === 'YouTube Premium' ? (
              <>
                <div style={{ margin: '0 auto 20px auto', width: '80px', height: '80px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg" style={{ color: '#ef4444' }}><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>
                </div>
                <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '10px' }}>Premium Activated!</h2>
                <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>Your YouTube Premium has been successfully activated on your account.</p>
              </>
            ) : (
              <>
                <FiCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '20px' }} />
                <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '10px' }}>Account Ready!</h2>
              </>
            )}
            
            {/* Conditional Details Block (Hide for YouTube) */}
            {pendingOrderData?.product !== 'YouTube Premium' && (approvedVpnDetails.gmail || approvedVpnDetails.vpnPass) && (
              <div className="virtual-card-reveal" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', textAlign: 'left', position: 'relative', overflow: 'hidden', marginTop: '20px' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: '#10b981', filter: 'blur(80px)', opacity: 0.2 }}></div>
                
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Email / Username</span>
                    <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>{approvedVpnDetails.gmail || approvedVpnDetails.userName}</div>
                  </div>
                  <button onClick={() => { navigator.clipboard.writeText(approvedVpnDetails.gmail || approvedVpnDetails.userName || ""); alert('Copied!'); }} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Copy">
                    <FiCopy />
                  </button>
                </div>

                {approvedVpnDetails.vpnPass && (
                  <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Password</span>
                      <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>{approvedVpnDetails.vpnPass}</div>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText(approvedVpnDetails.vpnPass); alert('Copied!'); }} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Copy">
                      <FiCopy />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Custom Admin Message */}
            {approvedVpnDetails.customMessage && (
              <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div dangerouslySetInnerHTML={{ __html: `"${approvedVpnDetails.customMessage}"` }} style={{ color: '#10b981', fontStyle: 'italic', fontSize: '1.1rem' }} />
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '5px' }}>- Message from Admin</div>
              </div>
            )}

            {/* Interactive Rating Section */}
            <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <h4 style={{ color: '#fff', marginBottom: '10px' }}>How was your experience?</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '15px' }}>Your review helps us improve our service.</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }} className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    stroke="currentColor" 
                    fill="currentColor" 
                    strokeWidth="0" 
                    viewBox="0 0 576 512" 
                    height="35px" 
                    width="35px" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: '#fbbf24', cursor: 'pointer', transition: 'transform 0.2s ease' }}
                    onClick={(e) => {
                      e.currentTarget.style.transform = 'scale(1.2)';
                      setTimeout(() => {
                        alert('Thanks for your ' + star + ' star review!');
                        setShowSuccessModal(false);
                      }, 400);
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                  </svg>
                ))}
              </div>
              
              <button onClick={() => setShowSuccessModal(false)} style={{ background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Skip Review & Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
