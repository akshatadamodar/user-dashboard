import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <header style={{ marginBottom: '40px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
            <h1 style={{ color: '#333', fontSize: '28px' }}>User Management Dashboard</h1>
          </header>
          
          <main>
            <Routes>
              {/* This route shows the main table (Dashboard) */}
              <Route path="/" element={<UserList />} />
              
              {/* This route shows the specific user details based on ID */}
              <Route path="/user/:id" element={<UserDetail />} />
            </Routes>
          </main>
          
          <footer style={{ marginTop: '50px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
            <p>© 2026 Frontend Assignment - Built with React Class Components</p>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;