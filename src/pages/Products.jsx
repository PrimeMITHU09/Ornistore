import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Products = ({ addToCart }) => {
  const eventsData = [
    {
      id: 1,
      date: "July 6, 2022",
      title: "Any App Trials for card",
      desc: "Get exclusive access to premium mobile app trials and subscriptions.",
      image: "/feature1.png"
    },
    {
      id: 2,
      date: "July 6, 2022",
      title: "facebook verified bage for card",
      desc: "Get your premium card linked and verified on Facebook.",
      image: "/feature2.png"
    },
    {
      id: 3,
      date: "July 6, 2022",
      title: "Any vpn for Mastercard",
      desc: "Secure your digital payments with our premium VPN service.",
      image: "/feature3.png"
    },
    {
      id: 4,
      date: "July 6, 2022",
      title: "Google play pass for card",
      desc: "Unlock free access to premium mobile games and apps using your card.",
      image: "/feature4.png"
    }
  ];


  return (
    <div className="page-content">
      <section className="events-highlight-section" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="section-title" style={{ color: 'var(--secondary-color)', textShadow: '0 0 20px rgba(14, 165, 233, 0.3)' }}>Exclusive Card Benefits</h2>
            <p className="section-subtitle">Unlock access to world-class digital services with your Premium Card.</p>
          </div>
          
          <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {eventsData.map(event => (
              <div key={event.id} className="event-card-highlight" style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(14, 165, 233, 0.3)', padding: '20px', borderRadius: '15px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--secondary-color)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(14, 165, 233, 0.2)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';}}>
                <div style={{ marginBottom: '20px', borderRadius: '10px', overflow: 'hidden' }}>
                  <img src={event.image} alt={event.title} style={{ width: '100%', height: '180px', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'} />
                </div>
                <div style={{ color: 'var(--secondary-color)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{event.date}</div>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '15px' }}>{event.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' }}>{event.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="benefits" style={{ paddingTop: '50px', paddingBottom: '50px', position: 'relative' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ fontSize: '3rem', background: 'linear-gradient(135deg, #fde047, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 0 25px rgba(253, 224, 71, 0.4)', marginBottom: '15px' }}>
              আমাদের কাছে কী কী পাবেন?
            </h2>
            <p className="section-subtitle" style={{ color: '#cbd5e1', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
              আপনার ডিজিটাল জীবনকে আরও সহজ ও প্রিমিয়াম করতে আমরা নিয়ে এসেছি সেরা সব সার্ভিস।
            </p>
          </div>
          
          <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
            {/* Item 1: App Trials */}
            <div className="benefit-card glass-panel" style={{ padding: '40px 30px', borderRadius: '24px', textAlign: 'left', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', borderTop: '4px solid #8b5cf6', background: 'rgba(20, 20, 40, 0.5)' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-15px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';}}>
              <div style={{ fontSize: '3.5rem', marginBottom: '15px', textShadow: '0 0 20px rgba(139, 92, 246, 0.6)', textAlign: 'center' }}>🚀</div>
              <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px', fontWeight: '600', textAlign: 'center' }}>প্রিমিয়াম অ্যাপস ট্রায়াল</h3>
              <ul style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '1.05rem', paddingLeft: '20px', margin: 0, listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px' }}>যেকোনো প্রিমিয়াম অ্যাপের ট্রায়াল আনলক করুন।</li>
                <li style={{ marginBottom: '10px' }}>অ্যাড-ফ্রি ও এক্সক্লুসিভ VIP ফিচার উপভোগ করুন।</li>
                <li>আনলিমিটেড অ্যাক্সেস ও ক্লাউড সিঙ্ক সুবিধা।</li>
              </ul>
            </div>
            
            {/* Item 2: Any VPN Trial */}
            <div className="benefit-card glass-panel" style={{ padding: '40px 30px', borderRadius: '24px', textAlign: 'left', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', borderTop: '4px solid #38bdf8', background: 'rgba(20, 20, 40, 0.5)' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-15px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(56, 189, 248, 0.3)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';}}>
              <div style={{ fontSize: '3.5rem', marginBottom: '15px', textShadow: '0 0 20px rgba(56, 189, 248, 0.6)', textAlign: 'center' }}>🛡️</div>
              <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px', fontWeight: '600', textAlign: 'center' }}>যেকোনো ভিপিএন ট্রায়াল</h3>
              <ul style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '1.05rem', paddingLeft: '20px', margin: 0, listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px' }}>সম্পূর্ণ প্রাইভেসি ও এনক্রিপ্টেড ব্রাউজিং ডাটা।</li>
                <li style={{ marginBottom: '10px' }}>জিও-রেস্ট্রিক্টেড গ্লোবাল কন্টেন্ট আনলক করুন।</li>
                <li>পাবলিক ওয়াইফাই-তে সম্পূর্ণ সিকিউরিটি গ্যারান্টি।</li>
              </ul>
            </div>
            
            {/* Item 3: FB Verified */}
            <div className="benefit-card glass-panel" style={{ padding: '40px 30px', borderRadius: '24px', textAlign: 'left', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', borderTop: '4px solid #10b981', background: 'rgba(20, 20, 40, 0.5)' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-15px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.3)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';}}>
              <div style={{ fontSize: '3.5rem', marginBottom: '15px', textShadow: '0 0 20px rgba(16, 185, 129, 0.6)', textAlign: 'center' }}>💎</div>
              <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px', fontWeight: '600', textAlign: 'center' }}>ফেসবুক ভেরিফায়েড ব্যাজ</h3>
              <ul style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '1.05rem', paddingLeft: '20px', margin: 0, listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px' }}>সোশ্যাল প্রোফাইলে ব্লু-ব্যাজ ও ট্রাস্ট ভ্যালু বৃদ্ধি।</li>
                <li style={{ marginBottom: '10px' }}>অ্যাকাউন্ট হ্যাকিং ও ফেক আইডি থেকে 100% সিকিউরিটি এনহ্যান্সমেন্ট (Security Enhance)।</li>
                <li>প্রাইওরিটি কাস্টমার সাপোর্ট ও এক্সক্লুসিভ ফিচার।</li>
              </ul>
            </div>
            
            {/* Item 4: Google Play Pass */}
            <div className="benefit-card glass-panel" style={{ padding: '40px 30px', borderRadius: '24px', textAlign: 'left', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', borderTop: '4px solid #f59e0b', background: 'rgba(20, 20, 40, 0.5)' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-15px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 158, 11, 0.3)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';}}>
              <div style={{ fontSize: '3.5rem', marginBottom: '15px', textShadow: '0 0 20px rgba(245, 158, 11, 0.6)', textAlign: 'center' }}>🎮</div>
              <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px', fontWeight: '600', textAlign: 'center' }}>গুগল প্লে পাস</h3>
              <ul style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '1.05rem', paddingLeft: '20px', margin: 0, listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px' }}>লিগ (League) ও কোয়েস্ট (Quest) খেলে প্লে পয়েন্ট (Play Point) আর্ন।</li>
                <li style={{ marginBottom: '10px' }}>অর্জিত পয়েন্ট দিয়ে Free Fire, PUBG সহ সকল গেমে ইন-গেম পারচেজ (In-game purchase)।</li>
                <li>হাজার হাজার গেম অ্যাড-ফ্রি খেলার দারুণ অভিজ্ঞতা।</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="detailed-features-section" style={{ padding: '100px 0', background: 'var(--bg-color)' }}>
        <div className="container">
          
          {/* Step 1: App Trials */}
          <div className="feature-step" style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '100px', flexWrap: 'wrap' }}>
            <div className="step-image-wrapper" style={{ flex: '1 1 400px' }}>
              <img src="/feature1.png" alt="App Trials" className="animated-float" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 50px rgba(109, 40, 217, 0.4)' }} />
            </div>
            <div className="step-content" style={{ flex: '1 1 400px' }}>
              <div className="step-badge" style={{ color: 'var(--secondary-color)', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 'bold' }}>Step 1 / Unlock Potential</div>
              <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '20px' }}>Any App Trials for Card</h2>
              <p style={{ color: '#cbd5e1', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>Experience the true power of premium applications without boundaries. By purchasing premium apps, you unlock an ecosystem of pro-level tools, uninterrupted ad-free experiences, and exclusive VIP features.</p>
              <ul style={{ color: '#94a3b8', listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
                <li>✨ Unlimited access to pro-tier software</li>
                <li>✨ Early access to beta features</li>
                <li>✨ Seamless cloud synchronization</li>
              </ul>
              <Link to="/checkout" state={{ product: "Any App Trials for Card" }} className="btn btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', boxShadow: '0 10px 20px rgba(109, 40, 217, 0.3)' }}>Buy Cards</Link>
            </div>
          </div>

          {/* Step 2: Facebook Verified */}
          <div className="feature-step reverse-step" style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '100px', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
            <div className="step-image-wrapper" style={{ flex: '1 1 400px' }}>
              <img src="/feature2.png" alt="Facebook Verified" className="animated-pulse" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 50px rgba(14, 165, 233, 0.4)' }} />
            </div>
            <div className="step-content" style={{ flex: '1 1 400px' }}>
              <div className="step-badge" style={{ color: '#0ea5e9', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 'bold' }}>Step 2 / Elite Status</div>
              <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '20px' }}>Facebook Verified Badge</h2>
              <p style={{ color: '#cbd5e1', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>Achieve the ultimate social status. A verified badge doesn't just mean security—it brings the exclusive feel of Facebook Premium & Facebook Plus. Gain priority customer support, increased visibility, and absolute protection against impersonation.</p>
              <ul style={{ color: '#94a3b8', listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
                <li>🔵 Stand out with the iconic Blue Badge</li>
                <li>🔵 Exclusive premium stickers and reactions</li>
                <li>🔵 VIP priority account support</li>
              </ul>
              <Link to="/checkout" state={{ product: "Facebook Verified Badge" }} className="btn btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', boxShadow: '0 10px 20px rgba(14, 165, 233, 0.3)' }}>Buy Facebook Badge</Link>
            </div>
          </div>

          {/* Step 3: VPN Trial */}
          <div className="feature-step" style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '100px', flexWrap: 'wrap' }}>
            <div className="step-image-wrapper" style={{ flex: '1 1 400px' }}>
              <img src="/feature3.png" alt="VPN Trial" className="animated-float-delay" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 50px rgba(16, 185, 129, 0.4)' }} />
            </div>
            <div className="step-content" style={{ flex: '1 1 400px' }}>
              <div className="step-badge" style={{ color: '#10b981', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 'bold' }}>Step 3 / Absolute Security</div>
              <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '20px' }}>Any VPN for Mastercard</h2>
              <p style={{ color: '#cbd5e1', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>Your digital footprint becomes invisible. With our integrated VPN service, experience military-grade encryption that secures your online payments, masks your location, and unlocks global content without restrictions.</p>
              <ul style={{ color: '#94a3b8', listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
                <li>🔒 Bank-level 256-bit AES encryption</li>
                <li>🔒 Complete anonymity on public Wi-Fi</li>
                <li>🔒 Access geo-blocked streaming services</li>
              </ul>
              <Link to="/checkout" state={{ product: "Any VPN for Mastercard" }} className="btn btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)' }}>Buy Premium VPN</Link>
            </div>
          </div>

          {/* Step 4: Google Play Pass */}
          <div className="feature-step reverse-step" style={{ display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
            <div className="step-image-wrapper" style={{ flex: '1 1 400px' }}>
              <img src="/feature4.png" alt="Play Pass" className="animated-pulse-delay" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 50px rgba(245, 158, 11, 0.4)' }} />
            </div>
            <div className="step-content" style={{ flex: '1 1 400px' }}>
              <div className="step-badge" style={{ color: '#f59e0b', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 'bold' }}>Step 4 / Infinite Entertainment</div>
              <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '20px' }}>Google Play Pass for Card</h2>
              <p style={{ color: '#cbd5e1', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>Transform your Play Store experience. Earn massive Google Play Points for every transaction. Use your points for in-game currency, premium titles, and exclusive store rewards. Dive into a library of hundreds of premium games completely free of ads and in-app purchases.</p>
              <ul style={{ color: '#94a3b8', listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
                <li>🎮 Earn & redeem Google Play Points</li>
                <li>🎮 Free access to top-tier paid games</li>
                <li>🎮 Zero advertisements and no micro-transactions</li>
              </ul>
              <Link to="/checkout" state={{ product: "Google Play Pass for Card" }} className="btn btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', boxShadow: '0 10px 20px rgba(245, 158, 11, 0.3)' }}>Buy Play Pass</Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Products;
