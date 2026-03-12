import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { socket } from '../services/socket';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [pageInfo, setPageInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    useEffect(() => {
        socket.connect();

        socket.on('connect', () => {
            console.log('Connected to server with socket ID:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
            socket.disconnect();
        };
    }, []);

    const fetchPosts = async (page) => {
        try {
            setLoading(true);
            const res = await api.get(`/posts?page=${page}&limit=5`);
            setPosts(res.data.posts);
            setPageInfo(res.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch posts');
            if (err.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>My Posts Dashboard</h1>
                <div className="header-actions">
                    <Link to="/create" className="btn btn-primary">Create New Post</Link>
                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </div>
            </header>

            {loading ? (
                <div className="loading">Loading posts...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : posts.length === 0 ? (
                <div className="empty-state">
                    <h3>No posts found!</h3>
                    <p>Create your first post to get started.</p>
                </div>
            ) : (
                <div className="posts-grid">
                    {posts.map(post => (
                        <div key={post._id} className="post-card">
                            <h3>{post.title}</h3>
                            <p>{post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}</p>
                            <small className="date">Created: {new Date(post.createdAt).toLocaleDateString()}</small>
                        </div>
                    ))}
                </div>
            )}

            {pageInfo && pageInfo.totalPosts > 0 && (
                <div className="pagination">
                    <button
                        disabled={!pageInfo.hasPrevPage}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="btn btn-secondary"
                    >
                        Previous
                    </button>
                    <span className="page-info">
                        Page {pageInfo.currentPage} of {pageInfo.totalPages} ({pageInfo.totalPosts} total)
                    </span>
                    <button
                        disabled={!pageInfo.hasNextPage}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="btn btn-secondary"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};
export default Dashboard;
