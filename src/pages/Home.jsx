import { useState } from 'react';
import { FiArrowRight, FiZap, FiLifeBuoy, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaApple, FaAmazon, FaSpotify, FaGoogle, FaPlaystation } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Ahmed F.", role: "Elite Member", text: "Got my virtual card instantly and used it on Netflix right away. Best service!" },
    { id: 2, name: "Sarah K.", role: "Gold Member", text: "The VPN trial and priority support have been lifesavers for my online business." }
  ]);
  const [newReview, setNewReview] = useState({ name: '', text: '' });
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if(newReview.name && newReview.text) {
      setReviews([...reviews, { id: Date.now(), name: newReview.name, role: "Verified Customer", text: newReview.text }]);
      setNewReview({ name: '', text: '' });
      alert("Thank you for your review!");
    }
  };

  const [activeFaq, setActiveFaq] = useState(null);
  const faqs = [
    { q: "How long does it take to get the card?", a: "Instantly! Once approved, your virtual card is ready to use immediately across all platforms." },
    { q: "Are there any hidden fees?", a: "No hidden fees. We believe in 100% transparency. What you see is what you pay." },
    { q: "Can I use this card internationally?", a: "Yes! Our premium cards have 0% foreign transaction fees and work seamlessly worldwide." }
  ];
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const featuresData = [
    {
      id: 1,
      title: "Google play pass for card",
      date: "July 6, 2022",
      image: "/playpass.png",
      desc: "Unlock free access to premium mobile games and apps using your card."
    },
    {
      id: 2,
      title: "Any vpn for Mastercard",
      date: "July 6, 2022",
      image: "/vpn.png",
      desc: "Secure your digital payments with our premium VPN service."
    },
    {
      id: 3,
      title: "facebook verified bage for card",
      date: "July 6, 2022",
      image: "/fb_verified.png",
      desc: "Get your premium card linked and verified on Facebook."
    },
    {
      id: 4,
      title: "Any App Trials for card",
      date: "July 6, 2022",
      image: "/app_trials.png",
      desc: "Get exclusive access to premium mobile app trials and subscriptions."
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="container">
          <h1>Discover <span>Exclusive</span><br/> MasterCards</h1>
          <p>Unlock a world of privileges with our premium collection of Elite, Gold, and Platinum MasterCards.</p>
          <div className="animated-pulse" style={{ marginTop: '30px', padding: '20px 40px', background: 'rgba(255, 255, 255, 0.08)', display: 'inline-block', borderRadius: '15px', border: '1px solid rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px', fontWeight: 'bold' }}>আপনাকে স্বাগতম! ✨</h3>
            <p style={{ color: '#cbd5e1', fontSize: '1.1rem', margin: 0 }}>আমাদের প্রিমিয়াম ডিজিটাল সার্ভিসের দুনিয়ায় আপনাকে পেয়ে আমরা আনন্দিত।</p>
          </div>
        </div>
      </section>

      <section className="cinematic-section">
        <div className="container">
          <div className="features-split">
            
            <div className="cinematic-card-wrapper">
              <img src="/cinematic_card.png" alt="Premium Cinematic Card" className="cinematic-image" />
              <div className="cinematic-glow"></div>
            </div>

            <div className="features-content">
              <h2 className="events-title" style={{textAlign: 'left', marginBottom: '30px'}}>What we provide with this card</h2>
              <div className="features-list">
                {featuresData.map(feature => (
                  <div key={feature.id} className="feature-item">
                    <img src={feature.image} alt={feature.title} className="feature-icon" />
                    <div className="feature-info">
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-desc">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop: '30px'}}>
                 <Link to="/products" className="btn btn-primary">Get Your Card <FiArrowRight /></Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="lifestyle-banner" style={{ backgroundImage: 'url(/lifestyle_banner.png)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '300px', marginTop: '50px' }}>
      </section>

      <section className="lifestyle-content" style={{ padding: '60px 0', background: 'var(--bg-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '20px' }}>Maximize Your Premium Lifestyle</h2>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 40px' }}>Pro Tips: Use your card for all digital subscriptions to unlock exclusive automated cashbacks and instant VIP access across our partner networks.</p>
          
          <div className="tips-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div className="tip-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '15px', maxWidth: '600px', width: '100%', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ color: '#fff', marginBottom: '10px', fontSize: '1.2rem' }}>0% Foreign Fees</h4>
              <p style={{ color: '#94a3b8' }}>Shop globally without worrying about extra conversion charges.</p>
            </div>
            <div className="tip-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '15px', maxWidth: '600px', width: '100%', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ color: '#fff', marginBottom: '10px', fontSize: '1.2rem' }}>Instant Approvals</h4>
              <p style={{ color: '#94a3b8' }}>Get instant access to virtual cards while waiting for your physical delivery.</p>
            </div>
            <div className="tip-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '15px', maxWidth: '600px', width: '100%', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ color: '#fff', marginBottom: '10px', fontSize: '1.2rem' }}>Priority Support</h4>
              <p style={{ color: '#94a3b8' }}>24/7 concierge service for all your travel and booking needs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="showcase-section" style={{ padding: '80px 0', background: 'var(--bg-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">The Ultimate Status Symbol</h2>
          <p className="section-subtitle">Crafted from premium metals and secured by state-of-the-art encryption.</p>
          <div className="showcase-image-wrapper">
            <img src="/cards_fan.png" alt="Premium Cards Collection" className="showcase-image" />
          </div>
        </div>
      </section>

      <section className="algorithm-section">
        <div className="container">
          <div className="features-split">
            <div className="features-content">
              <h2 className="section-title" style={{textAlign: 'left', marginBottom: '20px'}}>Powered by Smart Algorithms</h2>
              <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '30px' }}>Our cards are backed by state-of-the-art AI algorithms that learn your spending habits to provide dynamic credit limits and real-time fraud protection.</p>
              
              <div className="algo-features">
                <div className="algo-item">
                  <div className="algo-icon">🛡️</div>
                  <div>
                    <h4 style={{color: '#fff', fontSize: '1.1rem', marginBottom: '5px'}}>Predictive Security</h4>
                    <p style={{color: '#64748b', fontSize: '0.9rem'}}>Instantly freezes your card if anomalous algorithmic patterns are detected.</p>
                  </div>
                </div>
                <div className="algo-item">
                  <div className="algo-icon">📈</div>
                  <div>
                    <h4 style={{color: '#fff', fontSize: '1.1rem', marginBottom: '5px'}}>Dynamic Spending</h4>
                    <p style={{color: '#64748b', fontSize: '0.9rem'}}>Your credit limit evolves automatically based on your financial footprint.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="cinematic-card-wrapper" style={{transform: 'none'}}>
              <img src="/ai_algorithm.png" alt="AI Algorithm Smart Chip" className="cinematic-image" style={{boxShadow: '0 0 40px rgba(14, 165, 233, 0.3)'}} />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{fontSize: '2.5rem', color: '#fff', marginBottom: '20px'}}>Seamless Access Across All Devices</h2>
          <p style={{fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 40px'}}>Unlock your Premium Apps, Facebook Verified badge, and VPN trials effortlessly on PC, Android, and Apple.</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/devices.png" alt="Cross platform devices" style={{ width: '100%', maxWidth: '800px', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </section>

      <section className="advantages-section">
        <div className="container">
          <div className="advantages-grid">
            <div className="advantage-card">
              <div className="adv-icon"><FiZap /></div>
              <h3>Instant Card Supply</h3>
              <p>Why wait? Get your premium virtual card instantly upon approval and start enjoying your benefits right away across all your devices.</p>
            </div>
            <div className="advantage-card">
              <div className="adv-icon"><FiLifeBuoy /></div>
              <h3>24/7 Dedicated Help Desk</h3>
              <p>Our elite support team is always online to assist you with any inquiries, disputes, or premium service requests at any time of the day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTIONS ADDED */}
      <section className="brands-section" style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <div className="container">
          <p style={{ color: '#94a3b8', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Supported Worldwide By Premium Partners</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', color: '#cbd5e1', fontSize: '2.5rem' }}>
            <FaApple className="brand-icon" style={{transition: 'color 0.3s'}} onMouseOver={(e) => e.target.style.color='#fff'} onMouseOut={(e) => e.target.style.color='#cbd5e1'} />
            <FaAmazon className="brand-icon" style={{transition: 'color 0.3s'}} onMouseOver={(e) => e.target.style.color='#ff9900'} onMouseOut={(e) => e.target.style.color='#cbd5e1'} />
            <FaSpotify className="brand-icon" style={{transition: 'color 0.3s'}} onMouseOver={(e) => e.target.style.color='#1db954'} onMouseOut={(e) => e.target.style.color='#cbd5e1'} />
            <FaGoogle className="brand-icon" style={{transition: 'color 0.3s'}} onMouseOver={(e) => e.target.style.color='#4285F4'} onMouseOut={(e) => e.target.style.color='#cbd5e1'} />
            <FaPlaystation className="brand-icon" style={{transition: 'color 0.3s'}} onMouseOver={(e) => e.target.style.color='#003791'} onMouseOut={(e) => e.target.style.color='#cbd5e1'} />
          </div>
        </div>
      </section>

      <section className="testimonials-section" style={{ padding: '100px 0', background: 'var(--surface-color)' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>What Our Elite Members Say</h2>
          <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '50px' }}>
            {reviews.map(review => (
              <div key={review.id} className="review-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontStyle: 'italic', color: '#cbd5e1', marginBottom: '20px' }}>"{review.text}"</p>
                <div>
                  <strong style={{ color: '#fff', display: 'block' }}>{review.name}</strong>
                  <span style={{ color: 'var(--secondary-color)', fontSize: '0.9rem' }}>{review.role}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="review-form" style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }}>Leave a Review</h3>
            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="Your Name" value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})} style={{ padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} required />
              <textarea placeholder="Your Experience with our Card" value={newReview.text} onChange={(e) => setNewReview({...newReview, text: e.target.value})} style={{ padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', minHeight: '100px', outline: 'none' }} required></textarea>
              <button type="submit" className="btn btn-primary" style={{ padding: '12px' }}>Submit Review</button>
            </form>
          </div>
        </div>
      </section>

      <section className="faq-section" style={{ padding: '100px 0', background: 'var(--bg-color)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>Frequently Asked Questions</h2>
          <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', transition: 'all 0.3s' }}>
                <button onClick={() => toggleFaq(index)} style={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.1rem', cursor: 'pointer', textAlign: 'left', outline: 'none' }}>
                  {faq.q} {activeFaq === index ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {activeFaq === index && <div style={{ padding: '0 20px 20px', color: '#94a3b8', lineHeight: '1.6' }}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter-section" style={{ padding: '100px 0', background: 'linear-gradient(45deg, var(--bg-color), var(--surface-color))', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '20px' }}>Join Our VIP List</h2>
          <p style={{ color: '#94a3b8', marginBottom: '40px', fontSize: '1.1rem' }}>Subscribe to get early access to exclusive premium offers and updates.</p>
          <form style={{ display: 'flex', gap: '10px', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }} onSubmit={(e) => {e.preventDefault(); alert("Subscribed successfully!");}}>
            <input type="email" placeholder="Enter your email address" style={{ flex: 1, padding: '15px 20px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none' }} required />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '30px', padding: '0 30px' }}>Subscribe</button>
          </form>
        </div>
      </section>

    </div>
  );
};
export default Home;
