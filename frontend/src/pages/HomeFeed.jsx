import { useState, useEffect } from 'react';
import API from '../api/api';
import PostCard from '../components/PostCard';

const HomeFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // We'll use getFeedPosts which is protected, so token is needed.
                // If user is not logged in, we might want to redirect or show public posts if allowed.
                // Current backend requires auth.
                const { data } = await API.get('/posts');
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '470px', margin: '0 auto' }}>
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}
        </div>
    );
};

export default HomeFeed;
