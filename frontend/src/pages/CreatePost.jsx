import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/posts', { caption, image });
            navigate('/');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    style={{ padding: '0.5rem' }}
                    required
                />
                <textarea
                    placeholder="Caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    style={{ padding: '0.5rem', minHeight: '100px' }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '0.5rem',
                        backgroundColor: '#0095f6',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Share
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
