import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>InstaClone</Link>
            </div>
            <div style={styles.links}>
                {user ? (
                    <>
                        <Link to="/" style={styles.link}>Feed</Link>
                        <Link to="/create-post" style={styles.link}>Create Post</Link>
                        <Link to={`/profile/${user._id}`} style={styles.link}>Profile</Link>
                        <button onClick={handleLogout} style={styles.button}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/signup" style={styles.link}>Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#fff',
        borderBottom: '1px solid #dbdbdb',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    links: {
        display: 'flex',
        gap: '1rem',
    },
    link: {
        textDecoration: 'none',
        color: '#262626',
        fontSize: '1rem',
    },
    button: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        color: '#0095f6',
        fontWeight: 'bold',
    },
};

export default Navbar;
