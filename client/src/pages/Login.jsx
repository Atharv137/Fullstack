import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/users/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login to Creators Platform</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>Login</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                First time? Setup register via postman first, this form is just for logging in!
            </p>
        </div>
    );
};
export default Login;
