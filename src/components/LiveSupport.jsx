import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

const botResponses = [
  { keywords: ['vpn', 'surfshark', 'expressvpn', 'nordvpn'], response: 'We offer premium VPNs like Surfshark, ExpressVPN, and NordVPN at cheap rates. Check our Products page!' },
  { keywords: ['card', 'mastercard', 'payment'], response: 'We have virtual mastercards available for international payments, FB boosting, and app trials.' },
  { keywords: ['buy', 'order', 'purchase', 'how'], response: 'You can order directly from our website! Just add items to cart, checkout, and pay via bKash/Nagad. The details will be sent to your dashboard automatically.' },
  { keywords: ['track', 'status', 'pending'], response: 'You can track your order status in the "Track Order" or "My Orders" page. Most orders are approved within minutes!' },
  { keywords: ['hi', 'hello', 'hey'], response: 'Hello! Welcome to Orni Store. How can I help you today?' },
  { keywords: ['youtube', 'premium'], response: 'We provide YouTube Premium upgrades to your own email account. It is fast and secure!' },
  { keywords: ['whatsapp', 'contact', 'admin'], response: 'I am your automated virtual assistant! You can find most answers right here. What do you need help with?' }
];

const getBotResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  for (const item of botResponses) {
    if (item.keywords.some(kw => lowerMsg.includes(kw))) {
      return item.response;
    }
  }
  return "Thanks for reaching out! Please explore our website for more details, or let me know if you have a specific question about our products (VPNs, Cards, YouTube Premium).";
};

const LiveSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! 👋 I am your automated assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(userMsg);
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={toggleChat}
        className="live-support-btn"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          color: '#fff',
          border: 'none',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3), 0 0 15px rgba(56, 189, 248, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'transform 0.3s ease'
        }}
      >
        {isOpen ? <FiX /> : <FiMessageCircle />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="live-support-window"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '500px',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '15px 20px',
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 5px #10b981' }}></div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Live Assistant</h3>
            </div>
            <button onClick={toggleChat} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>
              <FiX />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                padding: '10px 15px',
                borderRadius: '15px',
                background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' : 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '0.95rem',
                lineHeight: '1.4',
                borderBottomRightRadius: msg.sender === 'user' ? '2px' : '15px',
                borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '15px'
              }}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{
            padding: '15px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            gap: '10px',
            background: 'rgba(0,0,0,0.2)'
          }}>
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 15px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                outline: 'none'
              }}
            />
            <button type="submit" style={{
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              color: '#fff',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LiveSupport;
