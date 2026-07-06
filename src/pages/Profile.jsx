import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiCalendar, FiShield, FiUser, FiPhone, FiMapPin, FiEdit3, FiSave, FiCamera, FiLock, FiCheckCircle, FiFileText } from 'react-icons/fi';

const Profile = ({ user, onProfileSave, authLoading }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    phone: '',
    address: '',
    dob: '',
    bio: '',
    profilePic: '',
  });

  // Get user-specific storage key
  const getStorageKey = () => {
    if (user?.uid) return `profile_${user.uid}`;
    return 'profile_guest';
  };

  // Load profile data from localStorage
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/auth');
      return;
    }
    const saved = localStorage.getItem(getStorageKey());
    if (saved) {
      setProfileData(JSON.parse(saved));
    } else {
      // Pre-fill from Firebase user data
      setProfileData(prev => ({
        ...prev,
        displayName: user.displayName || '',
        profilePic: user.photoURL || '',
      }));
    }
  }, [user, authLoading]);

  const handleChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(getStorageKey(), JSON.stringify(profileData));
    setIsEditing(false);
    setShowToast(true);
    if (onProfileSave) onProfileSave();
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('profilePic', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Derive locked fields from Firebase user
  const email = user?.email || 'N/A';
  const createdAt = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';
  const provider = user?.providerData?.[0]?.providerId === 'google.com' ? 'Google' : 'Email / Password';

  const avatarSrc = profileData.profilePic || null;
  const initials = (profileData.displayName || email || '?').charAt(0).toUpperCase();

  if (authLoading) {
    return (
      <div className="page-content" style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center', color: '#fff' }}>
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="page-content" style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', position: 'relative' }}>

      {/* Decorative Background */}
      <div style={{ position: 'absolute', top: '15%', left: '5%', width: '350px', height: '350px', background: 'var(--primary-color)', filter: 'blur(180px)', opacity: 0.2, zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '8%', width: '300px', height: '300px', background: 'var(--secondary-color)', filter: 'blur(160px)', opacity: 0.15, zIndex: 0 }}></div>

      <div className="profile-container glass-panel" style={{ width: '100%', maxWidth: '600px', borderRadius: '28px', position: 'relative', zIndex: 1, overflow: 'hidden', boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.6)' }}>

        {/* Header Banner */}
        <div className="profile-banner">
          <div className="profile-banner-pattern"></div>
        </div>

        {/* Avatar Section */}
        <div className="profile-avatar-section">
          <div className="profile-avatar-wrapper" onClick={() => isEditing && fileInputRef.current?.click()}>
            {avatarSrc ? (
              <img src={avatarSrc} alt="Profile" className="profile-avatar-img" />
            ) : (
              <div className="profile-avatar-placeholder">{initials}</div>
            )}
            {isEditing && (
              <div className="profile-avatar-overlay">
                <FiCamera size={22} />
                <span style={{ fontSize: '0.7rem', marginTop: '4px' }}>Change</span>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          <h2 className="profile-username">{profileData.displayName || 'Set Your Name'}</h2>
          <p className="profile-email-display">{email}</p>
        </div>

        {/* Content */}
        <div style={{ padding: '0 35px 35px' }}>

          {/* Locked Fields Section */}
          <div className="profile-section-label">
            <FiLock size={14} />
            <span>Account Information</span>
          </div>

          <div className="profile-locked-field">
            <div className="profile-field-icon"><FiMail /></div>
            <div className="profile-field-content">
              <label>Email Address</label>
              <p>{email}</p>
            </div>
            <div className="profile-lock-badge"><FiLock size={12} /></div>
          </div>

          <div className="profile-locked-field">
            <div className="profile-field-icon"><FiCalendar /></div>
            <div className="profile-field-content">
              <label>Account Created</label>
              <p>{createdAt}</p>
            </div>
            <div className="profile-lock-badge"><FiLock size={12} /></div>
          </div>

          <div className="profile-locked-field">
            <div className="profile-field-icon"><FiShield /></div>
            <div className="profile-field-content">
              <label>Auth Provider</label>
              <p>{provider}</p>
            </div>
            <div className="profile-lock-badge"><FiLock size={12} /></div>
          </div>

          {/* Editable Fields Section */}
          <div className="profile-section-label" style={{ marginTop: '30px' }}>
            <FiEdit3 size={14} />
            <span>Personal Information</span>
          </div>

          <div className="profile-editable-field">
            <div className="profile-field-icon"><FiUser /></div>
            <div className="profile-field-content">
              <label>Display Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.displayName}
                  onChange={(e) => handleChange('displayName', e.target.value)}
                  placeholder="Enter your name"
                  className="profile-input"
                />
              ) : (
                <p>{profileData.displayName || <span className="profile-empty">Not set</span>}</p>
              )}
            </div>
          </div>

          <div className="profile-editable-field">
            <div className="profile-field-icon"><FiPhone /></div>
            <div className="profile-field-content">
              <label>Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  className="profile-input"
                />
              ) : (
                <p>{profileData.phone || <span className="profile-empty">Not set</span>}</p>
              )}
            </div>
          </div>

          <div className="profile-editable-field">
            <div className="profile-field-icon"><FiMapPin /></div>
            <div className="profile-field-content">
              <label>Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter your address"
                  className="profile-input"
                />
              ) : (
                <p>{profileData.address || <span className="profile-empty">Not set</span>}</p>
              )}
            </div>
          </div>

          <div className="profile-editable-field">
            <div className="profile-field-icon"><FiCalendar /></div>
            <div className="profile-field-content">
              <label>Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={profileData.dob}
                  onChange={(e) => handleChange('dob', e.target.value)}
                  className="profile-input"
                />
              ) : (
                <p>{profileData.dob ? new Date(profileData.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : <span className="profile-empty">Not set</span>}</p>
              )}
            </div>
          </div>

          <div className="profile-editable-field">
            <div className="profile-field-icon"><FiFileText /></div>
            <div className="profile-field-content">
              <label>Bio</label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="profile-input profile-textarea"
                  rows={3}
                />
              ) : (
                <p>{profileData.bio || <span className="profile-empty">Not set</span>}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '14px', borderRadius: '14px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                  <FiSave /> Save Profile
                </button>
                <button
                  onClick={() => {
                    const saved = localStorage.getItem(getStorageKey());
                    if (saved) setProfileData(JSON.parse(saved));
                    setIsEditing(false);
                  }}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '14px', borderRadius: '14px', fontSize: '1rem' }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <FiEdit3 /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="profile-toast">
          <FiCheckCircle size={20} />
          <span>Profile saved successfully!</span>
        </div>
      )}
    </div>
  );
};

export default Profile;
