import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 font-sf-pro">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-0 p-6">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/watch/:videoId" element={<WatchPage />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/subjects" element={
                    <div className="glass-card p-8 text-center">
                      <h2 className="text-2xl font-bold text-gradient mb-4">Subjects Page</h2>
                      <p className="text-neutral-600">Coming soon with enhanced filtering and categorization</p>
                    </div>
                  } />
                  <Route path="/classrooms" element={
                    <div className="glass-card p-8 text-center">
                      <h2 className="text-2xl font-bold text-gradient mb-4">Classrooms</h2>
                      <p className="text-neutral-600">Virtual classroom management coming soon</p>
                    </div>
                  } />
                  <Route path="/favorites" element={
                    <div className="glass-card p-8 text-center">
                      <h2 className="text-2xl font-bold text-gradient mb-4">Favorites</h2>
                      <p className="text-neutral-600">Your saved videos will appear here</p>
                    </div>
                  } />
                  <Route path="/watch-later" element={
                    <div className="glass-card p-8 text-center">
                      <h2 className="text-2xl font-bold text-gradient mb-4">Watch Later</h2>
                      <p className="text-neutral-600">Your watch later queue will be displayed here</p>
                    </div>
                  } />
                  <Route path="/subject/:subject" element={
                    <div className="glass-card p-8 text-center">
                      <h2 className="text-2xl font-bold text-gradient mb-4">Subject Filter</h2>
                      <p className="text-neutral-600">Subject-specific content coming soon</p>
                    </div>
                  } />
                  <Route path="/grade/:grade" element={
                    <div className="glass-card p-8 text-center">
                      <h2 className="text-2xl font-bold text-gradient mb-4">Grade Filter</h2>
                      <p className="text-neutral-600">Grade-level filtering coming soon</p>
                    </div>
                  } />
                  <Route path="/search" element={
                    <div className="glass-card p-8 text-center">
                      <h2 className="text-2xl font-bold text-gradient mb-4">Search Results</h2>
                      <p className="text-neutral-600">Advanced search functionality coming soon</p>
                    </div>
                  } />
                  <Route path="/profile" element={
                    <div className="glass-card p-8 text-center">
                      <h2 className="text-2xl font-bold text-gradient mb-4">Profile</h2>
                      <p className="text-neutral-600">User profile management coming soon</p>
                    </div>
                  } />
                  <Route path="/dashboard" element={
                    <div className="glass-card p-8 text-center">
                      <h2 className="text-2xl font-bold text-gradient mb-4">Dashboard</h2>
                      <p className="text-neutral-600">Analytics and insights coming soon</p>
                    </div>
                  } />
                  <Route path="/upload" element={
                    <div className="glass-card p-8 text-center">
                      <h2 className="text-2xl font-bold text-gradient mb-4">Upload</h2>
                      <p className="text-neutral-600">Video upload functionality coming soon</p>
                    </div>
                  } />
                </Routes>
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;