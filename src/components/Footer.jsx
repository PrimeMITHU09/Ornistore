import { FaFacebook, FaTiktok, FaTelegram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        
        <div className="developer-info" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', color: '#94a3b8', marginBottom: '15px' }}>
            DEVELOPER & DESIGNER BY <span style={{ color: 'var(--primary-color)', textShadow: '0 0 10px var(--primary-color)' }}>MITHU</span>
          </p>
          <div className="social-links" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <a href="https://www.facebook.com/share/18tb9ZUx7z/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebook />
            </a>
            <a href="https://www.tiktok.com/@__mithu.09?_r=1&_t=ZS-97eCaNaOpyW" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTiktok />
            </a>
            <a href="https://t.me/Prime8088" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTelegram />
            </a>
            <a href="https://www.linkedin.com/in/mithu-jr-2519bb31b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedin />
            </a>
            <a href="https://github.com/PrimeMITHU09" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaGithub />
            </a>
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#64748b', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', width: '100%' }}>
          &copy; {new Date().getFullYear()} Orni Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
