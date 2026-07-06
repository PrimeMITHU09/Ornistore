import { useEffect, useState } from 'react';

const StarfieldBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars on mount
    const numStars = 100;
    const newStars = Array.from({ length: numStars }).map(() => ({
      id: Math.random().toString(36).substring(7),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="starfield-container">
      <div className="planet planet-1"></div>
      <div className="planet planet-2"></div>
      <div className="planet planet-3"></div>
      <div className="stars">
        {stars.map(star => (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: '#fff',
              borderRadius: '50%',
              opacity: 0.8,
              animation: `twinkling ${star.duration}s infinite ease-in-out ${star.delay}s`,
              boxShadow: `0 0 ${star.size * 2}px #fff`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StarfieldBackground;
