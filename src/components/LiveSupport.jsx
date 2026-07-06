import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

const botResponses = [
  { keywords: ['vpn', 'ভি পি এন', 'ভিপিএন', 'surfshark', 'expressvpn', 'nordvpn'], response: 'আমাদের কাছে Surfshark, ExpressVPN, এবং NordVPN এর মতো প্রিমিয়াম ভিপিএন আছে একদম সুলভ মূল্যে! আপনি "Products" পেজ থেকে এগুলো খুব সহজেই কিনে নিতে পারবেন। 😊' },
  { keywords: ['card', 'কার্ড', 'mastercard', 'মাস্টারকার্ড', 'payment'], response: 'আপনার কি ইন্টারন্যাশনাল পেমেন্ট বা ফেসবুক বুস্টিং এর জন্য কার্ড লাগবে? আমাদের কাছে বিভিন্ন ভার্চুয়াল মাস্টারকার্ড এভেইলেবল আছে। আপনি চাইলে এখনই ওয়েবসাইট থেকে অর্ডার করতে পারেন! 💳' },
  { keywords: ['buy', 'order', 'কিনবো', 'অর্ডার', 'purchase', 'how', 'কিভাবে'], response: 'অর্ডার করা খুবই সহজ! আপনি যে প্রোডাক্টটি নিতে চান তা কার্টে অ্যাড করুন এবং চেকআউট থেকে বিকাশ বা নগদের মাধ্যমে পেমেন্ট করে দিন। কিছুক্ষণের মধ্যেই ড্যাশবোর্ডে আপনার প্রোডাক্টের ডিটেইলস চলে আসবে। 🎉' },
  { keywords: ['track', 'status', 'অবস্থা', 'পেন্ডিং', 'pending'], response: 'আপনার অর্ডারের বর্তমান অবস্থা জানতে ওয়েবসাইটের "Track Order" অথবা "My Orders" পেজে যেতে পারেন। সাধারণত কয়েক মিনিটের মধ্যেই সব অর্ডার অ্যাপ্রুভ হয়ে যায়! ⏳' },
  { keywords: ['hi', 'hello', 'hey', 'হ্যালো', 'হাই'], response: 'হ্যালো! Orni Store-এ আপনাকে স্বাগতম। আমি Orni, আপনার ভার্চুয়াল অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি? ❤️' },
  { keywords: ['youtube', 'premium', 'ইউটিউব', 'প্রিমিয়াম'], response: 'আমরা আপনার নিজের জিমেইল অ্যাকাউন্টে ইউটিউব প্রিমিয়াম আপগ্রেড করে দিই! এটি ১০০% নিরাপদ এবং খুব দ্রুত ডেলিভারি দেওয়া হয়। 🚀' },
  { keywords: ['product', 'প্রোডাক্ট', 'পণ্য', 'কি কি'], response: 'আমাদের স্টোরে আপনি পাবেন সব ধরনের প্রিমিয়াম ভিপিএন, ভার্চুয়াল মাস্টারকার্ড এবং ইউটিউব প্রিমিয়াম সাবস্ক্রিপশন! আপনার কোনটা প্রয়োজন আমাকে বলতে পারেন। 🛍️' },
  { keywords: ['whatsapp', 'contact', 'admin', 'যোগাযোগ', 'অ্যাডমিন', 'হোয়াটসঅ্যাপ'], response: 'আমি Orni, আপনার অটোমেটেড অ্যাসিস্ট্যান্ট! আপনার বেশিরভাগ প্রশ্নের উত্তর আমি এখানেই দিয়ে দিতে পারব। আপনার কি জানার আছে আমাকে বলুন। 😊' }
];

const getBotResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  for (const item of botResponses) {
    if (item.keywords.some(kw => lowerMsg.includes(kw))) {
      return item.response;
    }
  }
  return "আপনাকে অসংখ্য ধন্যবাদ মেসেজ করার জন্য! দয়া করে ওয়েবসাইট থেকে আমাদের প্রোডাক্টগুলো (VPNs, Cards, YouTube Premium) ঘুরে দেখতে পারেন অথবা নির্দিষ্ট কোনো প্রশ্ন থাকলে আমাকে জিজ্ঞেস করতে পারেন। আমি আনন্দের সাথে সাহায্য করব! ✨";
};

const LiveSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'হ্যালো! 👋 আমি Orni, আপনার অটোমেটেড অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি?' }
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
