//All imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

import './App.css';

// fuction app
function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
console.log("Hello World!");

export default App;
