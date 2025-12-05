import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, HashRouter } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { BlogList, BlogDetail } from './pages/Blog';
import { Diagnostic } from './pages/Diagnostic';
import { AdminLogin, AdminDashboard, AdminEditor } from './pages/Admin';
import { subscribeToAuth, loginAdmin, logoutAdmin } from './services/firebase';
import { User } from './types';

// --- AUTH CONTEXT ---
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (e: string, p: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  login: async () => false,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    isAdmin: !!user,
    login: loginAdmin,
    logout: logoutAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- PROTECTED ROUTE WRAPPER ---
const ProtectedRoute = () => {
  const { isAdmin, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

// --- MAIN APP ---
const App = () => {
  return (
    <AuthProvider>
      {/* Using HashRouter to ensure compatibility with static file serving if needed, 
          in a real Next.js environment this would be standard page routing. */}
      <HashRouter>
        <div className="flex flex-col min-h-screen font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/diagnostic" element={<Diagnostic />} />
              
              {/* Admin Auth */}
              <Route path="/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route index element={<AdminDashboard />} />
                <Route path="posts/new" element={<AdminEditor />} />
                <Route path="posts/:id" element={<AdminEditor />} />
              </Route>
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;