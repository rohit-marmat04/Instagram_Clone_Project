import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';

const PostCard = ({ post }) => {
    const { user } = useAuth();
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(post.comments || []);
    const [likes, setLikes] = useState(post.likes || []);

    const isLiked = user && likes.includes(user._id);

    const handleLike = async () => {
        try {
            const { data } = await API.put(`/posts/${post._id}/like`);
            setLikes(data);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            const { data } = await API.post('/comments', {
                postId: post._id,
                text: commentText,
            });
            setComments([...comments, data]);
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <img
                    src={post.user?.profilePic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                    alt="avatar"
                    style={styles.avatar}
                />
                <Link to={`/profile/${post.user?._id}`} style={styles.usernameLink}>
                    <span style={styles.username}>{post.user?.username || 'Unknown'}</span>
                </Link>
            </div>
            <div style={styles.imageContainer}>
                <img
                    src={post.image}
                    alt="post"
                    style={styles.image}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/500?text=Image+Not+Found'; }}
                />
            </div>
            <div style={styles.content}>
                <div style={styles.actions}>
                    <button onClick={handleLike} style={styles.actionButton}>
                        {isLiked ? '❤️' : '🤍'}
                    </button>
                </div>
                <div style={styles.likes}>
                    {likes.length} likes
                </div>
                <p>
                    <span style={styles.username}>{post.user?.username}</span> {post.caption}
                </p>
                <div style={styles.comments}>
                    {comments.map((comment) => (
                        <p key={comment._id} style={styles.comment}>
                            <span style={styles.username}>{comment.user?.username}</span> {comment.text}
                        </p>
                    ))}
                </div>
                {user && (
                    <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            style={styles.commentInput}
                        />
                        <button type="submit" style={styles.postButton}>Post</button>
                    </form>
                )}
            </div>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #dbdbdb',
        borderRadius: '3px',
        marginBottom: '2rem',
        backgroundColor: '#fff',
        maxWidth: '470px',
        margin: '0 auto 2rem auto',
    },
    header: {
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    avatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    usernameLink: {
        textDecoration: 'none',
        color: '#262626',
    },
    username: {
        fontWeight: 'bold',
        marginRight: '0.5rem',
    },
    imageContainer: {
        width: '100%',
        backgroundColor: '#efefef',
        minHeight: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
        maxHeight: '600px',
        objectFit: 'contain',
    },
    content: {
        padding: '1rem',
    },
    actions: {
        marginBottom: '0.5rem',
    },
    actionButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5rem',
        padding: '0',
    },
    likes: {
        fontWeight: 'bold',
        marginBottom: '0.5rem',
    },
    comments: {
        marginTop: '0.5rem',
    },
    comment: {
        marginBottom: '0.25rem',
    },
    commentForm: {
        display: 'flex',
        marginTop: '1rem',
        borderTop: '1px solid #efefef',
        paddingTop: '0.5rem',
    },
    commentInput: {
        flex: 1,
        border: 'none',
        outline: 'none',
    },
    postButton: {
        background: 'none',
        border: 'none',
        color: '#0095f6',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
};

export default PostCard;
