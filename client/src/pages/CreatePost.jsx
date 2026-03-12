import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const CreatePost = () => {
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/posts', formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create post. Please try again.');
            if (err.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 style={{ marginBottom: '1.5rem' }}>Create New Post</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="form-group">
                <input
                    type="text"
                    placeholder="Post Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Post Content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    rows="8"
                    style={{ resize: 'vertical' }}
                ></textarea>
                <div className="actions" style={{ marginTop: '1rem' }}>
                    <button type="submit" disabled={loading} className="btn btn-primary">
                        {loading ? 'Creating...' : 'Create Post'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
export default CreatePost;
