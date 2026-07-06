import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiArrowRight, FiGithub } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';

const Auth = ({ handleLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Redirect to products if user is already logged in (e.g. after redirect back from Google)
  React.useEffect(() => {
    import('../firebase').then(({ auth }) => {
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            if (handleLogin) handleLogin();
            navigate('/products');
          }
        });
        return unsubscribe;
      });
    });
  }, [navigate, handleLogin]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrorMsg('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      if (handleLogin) handleLogin();
      navigate('/products');
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="page-content" style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      
      {/* Decorative Background Elements */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--primary-color)', filter: 'blur(150px)', opacity: 0.3, zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '300px', height: '300px', background: 'var(--secondary-color)', filter: 'blur(150px)', opacity: 0.2, zIndex: 0 }}></div>

      <div className="auth-container glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '40px', borderRadius: '24px', position: 'relative', zIndex: 1, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p style={{ color: '#94a3b8' }}>
            {isLogin ? 'Enter your details to access your account.' : 'Join us to get the best premium digital services.'}
          </p>
        </div>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {!isLogin && (
            <div className="input-group" style={{ position: 'relative' }}>
              <FiUser style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="Full Name" 
                style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none', transition: 'all 0.3s ease' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--secondary-color)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          )}

          <div className="input-group" style={{ position: 'relative' }}>
            <FiMail style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none', transition: 'all 0.3s ease' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--secondary-color)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <div className="input-group" style={{ position: 'relative' }}>
            <FiLock style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none', transition: 'all 0.3s ease' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--secondary-color)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          {errorMsg && (
            <div style={{ color: 'var(--danger-color)', fontSize: '0.9rem', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          {isLogin && (
            <div style={{ textAlign: 'right' }}>
              <a href="#" style={{ color: 'var(--secondary-color)', fontSize: '0.9rem', textDecoration: 'none' }}>Forgot Password?</a>
            </div>
          )}

          <button 
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1.1rem', marginTop: '10px' }}
          >
            {isLogin ? 'Sign In' : 'Sign Up'} <FiArrowRight />
          </button>
        </form>

        <div style={{ margin: '30px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', flex: 1 }}></div>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Or continue with</span>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', flex: 1 }}></div>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button type="button" onClick={handleGoogleSignIn} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}>
            <FaGoogle style={{ color: '#ea4335' }} /> Google
          </button>
          <button type="button" style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}>
            <FiGithub /> Github
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px', color: '#94a3b8' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={toggleAuthMode} 
            style={{ color: 'var(--secondary-color)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Sign up here' : 'Login here'}
          </span>
        </div>

      </div>
    </div>
  );
};

export default Auth;
