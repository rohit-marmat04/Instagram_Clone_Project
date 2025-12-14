import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';

const Profile = () => {
    const { id } = useParams();
    const { user: currentUser } = useAuth();
    const [profileUser, setProfileUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const { data: userData } = await API.get(`/users/profile/${id}`);
                setProfileUser(userData);
                setIsFollowing(userData.followers.includes(currentUser?._id));

                const { data: allPosts } = await API.get('/posts');
                const userPosts = allPosts.filter(post => post.user?._id === id);
                setPosts(userPosts);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [id, currentUser]);

    const handleFollow = async () => {
        try {
            if (isFollowing) {
                await API.put(`/users/unfollow/${id}`);
                setIsFollowing(false);
                setProfileUser(prev => ({
                    ...prev,
                    followers: prev.followers.filter(uid => uid !== currentUser._id)
                }));
            } else {
                await API.put(`/users/follow/${id}`);
                setIsFollowing(true);
                setProfileUser(prev => ({
                    ...prev,
                    followers: [...prev.followers, currentUser._id]
                }));
            }
        } catch (error) {
            console.error('Error following/unfollowing:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!profileUser) return <div>User not found</div>;

    const isOwnProfile = currentUser?._id === profileUser._id;

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <img
                    src={profileUser.profilePic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                    alt="avatar"
                    style={styles.avatar}
                />
                <div style={styles.info}>
                    <div style={styles.topRow}>
                        <h2 style={styles.username}>{profileUser.username}</h2>
                        {!isOwnProfile && currentUser && (
                            <button onClick={handleFollow} style={isFollowing ? styles.unfollowButton : styles.followButton}>
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        )}
                    </div>
                    <div style={styles.stats}>
                        <span><strong>{posts.length}</strong> posts</span>
                        <span><strong>{profileUser.followers.length}</strong> followers</span>
                        <span><strong>{profileUser.following.length}</strong> following</span>
                    </div>
                    <div style={styles.bio}>
                        <strong>{profileUser.username}</strong>
                    </div>
                </div>
            </header>

            <hr style={styles.divider} />

            <div style={styles.postsGrid}>
                {posts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))}
                {posts.length === 0 && <p style={{ textAlign: 'center', width: '100%' }}>No posts yet.</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '935px',
        margin: '0 auto',
        padding: '2rem',
    },
    header: {
        display: 'flex',
        marginBottom: '3rem',
        alignItems: 'center',
    },
    avatar: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginRight: '5rem',
        objectFit: 'cover',
    },
    info: {
        flex: 1,
    },
    topRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    username: {
        fontSize: '2rem',
        fontWeight: '300',
        marginRight: '1rem',
        margin: 0,
    },
    followButton: {
        marginLeft: '1.5rem',
        backgroundColor: '#0095f6',
        color: '#fff',
        border: 'none',
        padding: '0.4rem 1.2rem',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    unfollowButton: {
        marginLeft: '1.5rem',
        backgroundColor: '#efefef',
        color: '#262626',
        border: '1px solid #dbdbdb',
        padding: '0.4rem 1.2rem',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    stats: {
        display: 'flex',
        gap: '2rem',
        marginBottom: '1rem',
        fontSize: '1rem',
    },
    bio: {
        fontSize: '1rem',
    },
    divider: {
        border: 'none',
        borderTop: '1px solid #dbdbdb',
        marginBottom: '2rem',
    },
    postsGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
};

export default Profile;
