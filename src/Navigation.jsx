import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '10px',
      borderRadius: '8px'
    }}>
      <Link to="/" style={{ marginRight: '15px', color: '#172b36', textDecoration: 'none' }}>
        Original
      </Link>
      <Link to="/ghibli" style={{ marginRight: '15px', color: '#4a7c59', textDecoration: 'none' }}>
        Ghibli
      </Link>
      <Link to="/seasons" style={{ color: '#e88d67', textDecoration: 'none' }}>
        Seasons
      </Link>
    </nav>
  );
}

export default Navigation